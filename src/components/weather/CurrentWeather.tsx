import { MapPin, Droplets } from 'lucide-react'
import WeatherIcon from './WeatherIcon'

interface CurrentWeatherProps {
  city: string
  /** Region/country subtitle, e.g. "Community of Madrid, Spain". */
  region?: string
  /** Long date label, e.g. "Monday, August 24". */
  date: string
  /** Temperature already converted to the active unit. */
  temperature: number
  feelsLike: number
  tempSuffix: string
  code: number
  isDay: boolean
  condition: string
  /** Chance of rain for the current hour, 0–100. */
  rainChance: number
  /** Accent glow color derived from the current conditions. */
  glow: string
}

const CurrentWeather = ({
  city,
  region,
  date,
  temperature,
  feelsLike,
  tempSuffix,
  code,
  isDay,
  condition,
  rainChance,
  glow,
}: CurrentWeatherProps) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
      {/* Conditions glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full blur-3xl"
        style={{ background: glow }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin size={16} className="shrink-0 text-sky-300" />
            <h1 className="truncate text-lg font-semibold text-white">{city}</h1>
          </div>
          {region && <p className="mt-0.5 truncate text-sm text-slate-400">{region}</p>}
          <p className="mt-0.5 text-sm text-slate-400">{date}</p>

          <div className="mt-6 flex items-start gap-1">
            <span className="text-7xl font-bold leading-none tracking-tight text-white">
              {temperature}
            </span>
            <span className="mt-1 text-3xl font-medium text-slate-300">{tempSuffix}</span>
          </div>

          <p className="mt-3 text-base font-medium text-white">{condition}</p>
          <p className="text-sm text-slate-400">
            Feels like {feelsLike}
            {tempSuffix}
          </p>

          {rainChance > 0 && (
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
              <Droplets size={13} />
              {rainChance}% chance of rain
            </div>
          )}
        </div>

        <WeatherIcon
          code={code}
          isDay={isDay}
          size="large"
          className="shrink-0 text-white drop-shadow-[0_8px_24px_rgba(56,189,248,0.35)]"
        />
      </div>
    </section>
  )
}

export default CurrentWeather
