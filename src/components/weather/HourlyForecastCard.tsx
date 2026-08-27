import { Droplets } from 'lucide-react'
import WeatherIcon from './WeatherIcon'

export interface HourData {
  iso: string
  time: string
  code: number
  temp: number
  rain: number
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
  rain,
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
      className={`flex min-w-18 flex-1 snap-start flex-col items-center gap-2 rounded-2xl px-2 py-3 transition-colors ${
        active ? 'bg-panel-hover' : 'hover:bg-panel-hover'
      }`}
    >
      <span className="text-[11px] font-medium text-muted">{time}</span>
      <WeatherIcon code={code} isDay={isDay} size="sm" />
      <span className="text-sm font-semibold text-content">{temp}°</span>
      {rain > 0 && (
        <span className="flex items-center gap-0.5 text-[10px] text-faint">
          <Droplets size={10} />
          {Math.round(rain)}%
        </span>
      )}
    </button>
  )
}

export default HourlyForecastCard
