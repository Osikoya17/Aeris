import { useEffect, useMemo, useRef } from 'react'
import { CloudSun } from 'lucide-react'
import DashboardLayout from './components/layout/DashBoardLayout'
import SearchBar from './components/weather/SearchBar'
import CurrentWeather from './components/weather/CurrentWeather'
import HourlyForecast from './components/weather/HourlyForecast'
import WeatherConditions from './components/weather/WeatherConditions'
import WeeklyForecast from './components/weather/WeeklyForecast'
import ChanceOfRain, { type RainHour } from './components/weather/ChanceOfRain'
import HighlightsDeck from './components/weather/HighlightsDeck'
import UnitToggle from './components/ui/UnitToggle'
import ThemeToggle from './components/ui/ThemeToggle'
import Loading from './components/ui/Loading'
import ErrorMessage from './components/ui/ErrorMessage'
import { useWeather } from './hooks/useWeather'
import { useUnits } from './hooks/useUnits'
import { useTheme } from './hooks/useTheme'
import type { HourData } from './components/weather/HourlyForecastCard'
import type { ForecastDayData } from './components/weather/ForecastDay'
import type { GeoLocation } from './types/weather'
import { formatHourShort, formatWeekday, formatLongDate } from './utils/formatDate'
import { describeWeatherCode } from './utils/weatherCodes'
import { displayTemp, displayWind, windUnitLabel } from './utils/units'
import { weatherTheme } from './utils/weatherBackground'

const DEFAULT_CITY = 'Lagos, Nigeria'
const HOURS_AHEAD = 8
const TEMP_SUFFIX = '°'

const isDaytime = (
  hour: string,
  dailyTime: string[],
  sunrise: string[],
  sunset: string[],
  fallback: boolean,
): boolean => {
  const day = hour.slice(0, 10)
  const idx = dailyTime.findIndex((d) => d.slice(0, 10) === day)
  if (idx < 0) return fallback
  return hour >= sunrise[idx] && hour < sunset[idx]
}

const describeLocation = (place: GeoLocation): string =>
  [place.admin1, place.country].filter(Boolean).join(', ')

const App = () => {
  const {
    weather,
    location,
    loading,
    error,
    fetchWeatherForLocation,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  } = useWeather()
  const { unit, setUnit } = useUnits()
  const { theme, setTheme } = useTheme()

  const didInit = useRef(false)
  useEffect(() => {
    if (didInit.current) return
    didInit.current = true

    if (!('geolocation' in navigator)) {
      fetchWeatherByCity(DEFAULT_CITY)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeatherByCity(DEFAULT_CITY),
      { timeout: 8000, maximumAge: 600000 },
    )
  }, [fetchWeatherByCoords, fetchWeatherByCity])

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => {},
      { timeout: 8000, maximumAge: 600000 },
    )
  }

  const nowIndex = useMemo(() => {
    if (!weather) return 0
    const stamp = weather.current.time.slice(0, 13)
    const index = weather.hourly.time.findIndex((t) => t.slice(0, 13) === stamp)
    return index >= 0 ? index : 0
  }, [weather])

  const hours = useMemo<HourData[]>(() => {
    if (!weather) return []
    const { time, temperature_2m, weather_code, precipitation_probability } = weather.hourly
    const { time: dTime, sunrise, sunset } = weather.daily
    const fallbackDay = weather.current.is_day === 1
    return time.slice(nowIndex, nowIndex + HOURS_AHEAD).map((t, i) => ({
      iso: t,
      time: i === 0 ? 'Now' : formatHourShort(t),
      code: weather_code[nowIndex + i],
      temp: displayTemp(temperature_2m[nowIndex + i], unit),
      rain: precipitation_probability[nowIndex + i] ?? 0,
      isDay: isDaytime(t, dTime, sunrise, sunset, fallbackDay),
    }))
  }, [weather, nowIndex, unit])

  const rainHours = useMemo<RainHour[]>(() => {
    if (!weather) return []
    const { time, precipitation_probability } = weather.hourly
    return time.slice(nowIndex, nowIndex + HOURS_AHEAD).map((t, i) => ({
      label: i === 0 ? 'Now' : formatHourShort(t),
      chance: precipitation_probability[nowIndex + i] ?? 0,
    }))
  }, [weather, nowIndex])

  const days = useMemo<ForecastDayData[]>(() => {
    if (!weather) return []
    const {
      time,
      weather_code,
      temperature_2m_max,
      temperature_2m_min,
      precipitation_probability_max,
    } = weather.daily
    return time.map((t, i) => ({
      date: t,
      day: formatWeekday(t),
      code: weather_code[i],
      condition: describeWeatherCode(weather_code[i]),
      high: displayTemp(temperature_2m_max[i], unit),
      low: displayTemp(temperature_2m_min[i], unit),
      rain: precipitation_probability_max[i] ?? 0,
    }))
  }, [weather, unit])

  const pageTheme = weather
    ? weatherTheme(weather.current.weather_code, weather.current.is_day === 1, theme)
    : undefined

  const rainChance = weather?.hourly.precipitation_probability[nowIndex] ?? 0

  return (
    <DashboardLayout background={pageTheme?.background}>
      <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
        <header className="mb-5 flex items-center gap-3 md:mb-6">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-content">
            <CloudSun size={18} />
          </span>
          <span className="text-lg font-semibold text-content">Aeris</span>

          <div className="min-w-0 flex-1">
            <SearchBar
              onSelect={fetchWeatherForLocation}
              onUseLocation={useMyLocation}
              loading={loading}
            />
          </div>

          <div className="flex items-center gap-2">
            <UnitToggle unit={unit} onChange={setUnit} />
            <ThemeToggle theme={theme} onChange={setTheme} />
          </div>
        </header>

        {error && <ErrorMessage message={error} />}

        {!weather && !error && <Loading />}

        {weather && location && (
          <div
            className={`space-y-4 transition-opacity duration-300 md:space-y-5 ${
              loading ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <HighlightsDeck
              feelsLike={displayTemp(weather.current.apparent_temperature, unit)}
              rainChance={rainChance}
              wind={displayWind(weather.current.wind_speed_10m, unit)}
              humidity={weather.current.relative_humidity_2m}
              uvIndex={weather.daily.uv_index_max[0]}
              tempSuffix={TEMP_SUFFIX}
              windLabel={windUnitLabel(unit)}
            />

            <div className="grid items-start gap-4 md:gap-5 lg:grid-cols-[minmax(320px,380px)_1fr]">
              <CurrentWeather
                city={location.name}
                region={describeLocation(location)}
                date={formatLongDate(weather.current.time)}
                temperature={displayTemp(weather.current.temperature_2m, unit)}
                feelsLike={displayTemp(weather.current.apparent_temperature, unit)}
                tempSuffix={TEMP_SUFFIX}
                code={weather.current.weather_code}
                isDay={weather.current.is_day === 1}
                condition={describeWeatherCode(weather.current.weather_code)}
                rainChance={rainChance}
                glow={pageTheme?.glow ?? 'transparent'}
              />

              <div className="space-y-4 md:space-y-5">
                <WeeklyForecast days={days} />
                <ChanceOfRain hours={rainHours} />
              </div>
            </div>

            <HourlyForecast hours={hours} />

            <WeatherConditions
              feelsLike={displayTemp(weather.current.apparent_temperature, unit)}
              wind={displayWind(weather.current.wind_speed_10m, unit)}
              windDirection={weather.current.wind_direction_10m}
              humidity={weather.current.relative_humidity_2m}
              uvIndex={weather.daily.uv_index_max[0]}
              sunrise={weather.daily.sunrise[0]}
              sunset={weather.daily.sunset[0]}
              tempSuffix={TEMP_SUFFIX}
              windLabel={windUnitLabel(unit)}
            />
          </div>
        )}
      </main>
    </DashboardLayout>
  )
}

export default App
