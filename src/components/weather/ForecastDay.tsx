import WeatherIcon from './WeatherIcon'

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
  isToday?: boolean
}

const ForecastDay = ({
  day,
  code,
  condition,
  high,
  low,
  isToday = false,
}: ForecastDayProps) => {
  return (
    <div
      className={`flex min-w-19 flex-1 snap-start flex-col items-center gap-3 rounded-2xl px-2 py-4 transition-colors ${
        isToday
          ? 'bg-accent text-accent-content shadow-lg shadow-black/15'
          : 'bg-inset text-content hover:bg-panel-hover'
      }`}
    >
      <span
        className={`text-xs font-semibold ${isToday ? 'text-accent-content' : 'text-muted'}`}
      >
        {isToday ? 'Today' : day}
      </span>

      <WeatherIcon
        code={code}
        size="md"
        className={isToday ? 'text-accent-content' : 'text-accent-ink'}
      />
      <span className="sr-only">{condition}</span>

      <div className="flex flex-col items-center leading-tight">
        <span className="text-lg font-bold">{high}°</span>
        <span
          className={`text-xs ${isToday ? 'text-accent-content/70' : 'text-faint'}`}
        >
          {low}°
        </span>
      </div>
    </div>
  )
}

export default ForecastDay
