// Types for the Open-Meteo APIs (https://open-meteo.com/en/docs).

/** A single geocoding search result. */
export interface GeoLocation {
  id: number
  name: string
  latitude: number
  longitude: number
  country?: string
  country_code?: string
  /** First-level administrative area, e.g. a region or state. */
  admin1?: string
  timezone?: string
}

export interface GeocodingResponse {
  results?: GeoLocation[]
}

/** Current conditions block. */
export interface CurrentWeather {
  time: string
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  weather_code: number
  wind_speed_10m: number
  wind_direction_10m: number
  /** 1 during daytime, 0 at night. */
  is_day: number
}

/** Hourly series. Every array is parallel to `time`. */
export interface HourlyWeather {
  time: string[]
  temperature_2m: number[]
  precipitation_probability: number[]
  weather_code: number[]
}

/** Daily series. Every array is parallel to `time`. */
export interface DailyWeather {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_probability_max: number[]
  uv_index_max: number[]
  sunrise: string[]
  sunset: string[]
}

export interface WeatherResponse {
  latitude: number
  longitude: number
  timezone: string
  current: CurrentWeather
  hourly: HourlyWeather
  daily: DailyWeather
}
