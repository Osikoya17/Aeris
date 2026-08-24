import { Thermometer, Droplets, Wind, Sun, Sunrise, Sunset, Navigation } from 'lucide-react'
import ConditionCard from './ConditionCard'
import { formatHour } from '../../utils/formatDate'
import { compassDirection } from '../../utils/direction'
import { uvBand, UV_SCALE_MAX } from '../../utils/uv'

interface WeatherConditionsProps {
  /** Already converted to the active unit system. */
  feelsLike: number
  wind: number
  windDirection: number
  humidity: number
  uvIndex: number
  sunrise: string
  sunset: string
  tempSuffix: string
  windLabel: string
}

const WeatherConditions = ({
  feelsLike,
  wind,
  windDirection,
  humidity,
  uvIndex,
  sunrise,
  sunset,
  tempSuffix,
  windLabel,
}: WeatherConditionsProps) => {
  const band = uvBand(uvIndex)
  const uvPct = Math.min(100, (uvIndex / UV_SCALE_MAX) * 100)

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Air conditions
      </h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <ConditionCard
          icon={Thermometer}
          label="Feels like"
          value={`${feelsLike}${tempSuffix}`}
        />

        <ConditionCard
          icon={Wind}
          label="Wind"
          value={`${wind} ${windLabel}`}
          sub={
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Navigation
                size={13}
                className="text-sky-300"
                style={{ transform: `rotate(${windDirection}deg)` }}
                fill="currentColor"
              />
              <span>from {compassDirection(windDirection)}</span>
            </div>
          }
        />

        <ConditionCard
          icon={Droplets}
          label="Humidity"
          value={`${Math.round(humidity)}%`}
          sub={
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-sky-400"
                style={{ width: `${Math.min(100, Math.max(0, humidity))}%` }}
              />
            </div>
          }
        />

        <ConditionCard
          icon={Sun}
          label="UV index"
          value={`${Math.round(uvIndex)}`}
          sub={
            <div className="space-y-1.5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${uvPct}%`, backgroundColor: band.color }}
                />
              </div>
              <span className="text-xs text-slate-400">{band.label}</span>
            </div>
          }
        />

        <ConditionCard icon={Sunrise} label="Sunrise" value={formatHour(sunrise)} />
        <ConditionCard icon={Sunset} label="Sunset" value={formatHour(sunset)} />
      </div>
    </section>
  )
}

export default WeatherConditions
