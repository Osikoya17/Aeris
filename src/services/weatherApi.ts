import { weatherApi } from "./axios";
import type { WeatherResponse } from "../types/weather";

export const getWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherResponse> => {
  const response = await weatherApi.get<WeatherResponse>("/forecast", {
    params: {
      latitude,
      longitude,

      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "weather_code",
        "wind_speed_10m",
        "wind_direction_10m",
        "is_day",
      ].join(","),

      hourly: [
        "temperature_2m",
        "precipitation_probability",
        "weather_code",
      ].join(","),

      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "uv_index_max",
        "sunrise",
        "sunset",
      ].join(","),

      timezone: "auto",

      forecast_days: 7,
    },
  });

  return response.data;
};
