import WeatherIcon from './WeatherIcon'
import { Droplets } from 'lucide-react'

export interface ForecastDayData {
  date: string
  day: string
  code: number
  condition: string
  high: number
  low: number
  rain: number
}

interface ForecastDayProps extends ForecastDayData {
  isToday?: boolean
  /** Whether to show the rain probability (hidden on mobile carousel). */
  showRain?: boolean
}

const ForecastDay = ({
  day,
  code,
  condition,
  high,
  low,
  rain,
  isToday = false,
  showRain = true,
}: ForecastDayProps) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
        isToday
          ? 'bg-accent text-accent-content'
          : 'text-content hover:bg-panel-hover'
      }`}
    >
      <span
        className={`w-12 shrink-0 text-sm font-medium ${
          isToday ? 'text-accent-content' : 'text-muted'
        }`}
      >
        {isToday ? 'Today' : day}
      </span>

      <WeatherIcon
        code={code}
        size="sm"
        className={isToday ? 'text-accent-content' : 'text-accent-ink'}
      />
      <span className="sr-only">{condition}</span>

      {showRain && (
        <span
          className={`flex w-14 shrink-0 items-center gap-1 text-xs ${
            rain > 30
              ? isToday
                ? 'text-accent-content/80'
                : 'text-muted'
              : isToday
                ? 'text-accent-content/50'
                : 'text-faint'
          }`}
        >
          <Droplets size={12} />
          {Math.round(rain)}%
        </span>
      )}

      <span className="flex-1" />

      <span
        className={`text-sm ${isToday ? 'text-accent-content/60' : 'text-faint'}`}
      >
        {low}°
      </span>

      <div className="relative h-1.5 w-20 overflow-hidden rounded-full bg-inset sm:w-24">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent-ink"
          style={{
            left: `${Math.max(0, ((low - 15) / 30) * 100)}%`,
            right: `${Math.max(0, 100 - ((high - 15) / 30) * 100)}%`,
          }}
        />
      </div>

      <span className="text-sm font-semibold">{high}°</span>
    </div>
  )
}

export default ForecastDay
