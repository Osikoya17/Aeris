import WeatherIcon from './WeatherIcon'
import { tempColor } from '../../utils/tempScale'

export interface ForecastDayData {
  /** ISO date, used as the list key. */
  date: string
  /** Short weekday label, e.g. "Tue". */
  day: string
  code: number
  condition: string
  /** Temperatures already converted to the active unit. */
  high: number
  low: number
}

interface ForecastDayProps extends ForecastDayData {
  /** Coldest low and warmest high across the whole week, for the shared scale. */
  weekMin: number
  weekMax: number
  isToday?: boolean
}

const ForecastDay = ({
  day,
  code,
  condition,
  high,
  low,
  weekMin,
  weekMax,
  isToday = false,
}: ForecastDayProps) => {
  const range = weekMax - weekMin || 1
  const left = ((low - weekMin) / range) * 100
  const width = Math.max(((high - low) / range) * 100, 8)

  return (
    <div className="flex items-center gap-3 py-2.5">
      <span
        className={`w-11 shrink-0 text-sm ${isToday ? 'font-semibold text-white' : 'text-slate-300'}`}
      >
        {isToday ? 'Today' : day}
      </span>

      <WeatherIcon code={code} size="sm" className="shrink-0 text-sky-300" />
      <span className="sr-only">{condition}</span>

      <span className="w-8 shrink-0 text-right text-sm text-slate-400">{low}°</span>

      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 rounded-full"
          style={{
            left: `${left}%`,
            width: `${width}%`,
            background: `linear-gradient(90deg, ${tempColor((low - weekMin) / range)}, ${tempColor(
              (high - weekMin) / range,
            )})`,
          }}
        />
      </div>

      <span className="w-8 shrink-0 text-sm font-medium text-white">{high}°</span>
    </div>
  )
}

export default ForecastDay
