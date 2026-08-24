import { useCallback, useState } from "react";
import { getWeather } from "../services/weatherApi";
import { searchCity } from "../services/geocodingApi";
import { reverseGeocode } from "../services/reverseGeocode";
import type { GeoLocation, WeatherResponse } from "../types/weather";

const toMessage = (error: unknown, fallback = "Something went wrong"): string =>
  error instanceof Error ? error.message : fallback;

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [location, setLocation] = useState<GeoLocation | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /** Fetch weather for an already-resolved location (e.g. a picked search result). */
  const fetchWeatherForLocation = useCallback(async (place: GeoLocation) => {
    try {
      setLoading(true);
      setError(null);

      const weatherData = await getWeather(place.latitude, place.longitude);

      setLocation(place);
      setWeather(weatherData);
    } catch (err) {
      setError(toMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  /** Look a city up by name, then fetch weather for the best match. */
  const fetchWeatherByCity = useCallback(async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const { results } = await searchCity(city);

      if (!results?.length) {
        throw new Error(`Couldn't find "${city}". Try another city.`);
      }

      const place = results[0];
      const weatherData = await getWeather(place.latitude, place.longitude);

      setLocation(place);
      setWeather(weatherData);
    } catch (err) {
      setError(toMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  /** Fetch weather for raw coordinates, resolving a display name when possible. */
  const fetchWeatherByCoords = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        setLoading(true);
        setError(null);

        const [weatherData, place] = await Promise.all([
          getWeather(latitude, longitude),
          reverseGeocode(latitude, longitude).catch(() => null),
        ]);

        setLocation({
          id: 0,
          name: place?.city || place?.locality || "Current location",
          latitude,
          longitude,
          country: place?.countryName,
          admin1: place?.principalSubdivision,
        });
        setWeather(weatherData);
      } catch (err) {
        setError(toMessage(err));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    weather,
    location,
    loading,
    error,
    fetchWeatherForLocation,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  };
};
