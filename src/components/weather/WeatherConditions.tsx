import { Thermometer, Droplets, Wind, Sun, Sunrise, Sunset, Navigation } from 'lucide-react'
import ConditionCard, { type ConditionCardProps } from './ConditionCard'
import Carousel from '../ui/Carousel'
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

  // Defined once, rendered twice: as a swipe carousel on mobile and as the
  // grid on desktop. Keeps the meter/compass markup in a single place.
  const cards: ConditionCardProps[] = [
    {
      icon: Thermometer,
      label: 'Feels like',
      value: `${feelsLike}${tempSuffix}`,
    },
    {
      icon: Wind,
      label: 'Wind',
      value: `${wind} ${windLabel}`,
      sub: (
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Navigation
            size={13}
            className="text-accent"
            style={{ transform: `rotate(${windDirection}deg)` }}
            fill="currentColor"
          />
          <span>from {compassDirection(windDirection)}</span>
        </div>
      ),
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${Math.round(humidity)}%`,
      sub: (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-inset">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${Math.min(100, Math.max(0, humidity))}%` }}
          />
        </div>
      ),
    },
    {
      icon: Sun,
      label: 'UV index',
      value: `${Math.round(uvIndex)}`,
      sub: (
        <div className="space-y-1.5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-inset">
            <div
              className="h-full rounded-full"
              style={{ width: `${uvPct}%`, backgroundColor: band.color }}
            />
          </div>
          <span className="text-xs text-muted">{band.label}</span>
        </div>
      ),
    },
    { icon: Sunrise, label: 'Sunrise', value: formatHour(sunrise) },
    { icon: Sunset, label: 'Sunset', value: formatHour(sunset) },
  ]

  return (
    <section className="rounded-3xl border border-line bg-panel p-5 backdrop-blur-md md:p-6">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-wide text-muted">
        Air conditions
      </h2>

      {/* Mobile: swipe carousel (cards peek the next to advertise the gesture) */}
      <div className="md:hidden">
        <Carousel ariaLabel="Air conditions" gap="gap-3">
          {cards.map((card) => (
            <ConditionCard
              key={card.label}
              {...card}
              className="snap-start shrink-0 basis-[46%]"
            />
          ))}
        </Carousel>
      </div>

      {/* Desktop: the original 3-column grid, unchanged. */}
      <div className="hidden gap-3 md:grid md:grid-cols-3">
        {cards.map((card) => (
          <ConditionCard key={card.label} {...card} />
        ))}
      </div>
    </section>
  )
}

export default WeatherConditions
