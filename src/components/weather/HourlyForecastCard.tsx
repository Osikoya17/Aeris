import WeatherIcon from './WeatherIcon'

export interface HourData {
  /** ISO timestamp, used as the list key. */
  iso: string
  /** Display label, e.g. "Now" or "2 PM". */
  time: string
  code: number
  /** Temperature already converted to the active unit. */
  temp: number
  isDay: boolean
}

interface HourlyForecastCardProps extends HourData {
  active?: boolean
  onActivate?: () => void
  onClear?: () => void
}

const HourlyForecastCard = ({
  time,
  code,
  temp,
  isDay,
  active = false,
  onActivate,
  onClear,
}: HourlyForecastCardProps) => {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onMouseLeave={onClear}
      onBlur={onClear}
      className={`flex min-w-18 flex-1 flex-col items-center gap-2.5 rounded-2xl px-2 py-3 transition-colors ${
        active ? 'bg-panel-hover' : 'hover:bg-panel-hover'
      }`}
    >
      <span className="text-[11px] font-medium text-muted">{time}</span>
      <WeatherIcon code={code} isDay={isDay} size="sm" />
      <span className="text-sm font-semibold text-content">{temp}°</span>
    </button>
  )
}

export default HourlyForecastCard
