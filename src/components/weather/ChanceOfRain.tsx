import { useState } from 'react'
import Carousel from '../ui/Carousel'

export interface RainHour {
  /** Display label, e.g. "Now" or "3 PM". */
  label: string
  /** Precipitation probability, 0–100. */
  chance: number
}

interface ChanceOfRainProps {
  hours: RainHour[]
}

/**
 * Single-series bar chart of hourly rain probability. The full-height track
 * gives each bar its 0–100% context; only the peak (and whatever is hovered)
 * is directly labelled, so the panel stays quiet until you read it.
 *
 * Columns keep `flex-1` so they fill the panel on desktop, but a `min-w` floor
 * makes them overflow into a swipe carousel on a narrow phone.
 */
const ChanceOfRain = ({ hours }: ChanceOfRainProps) => {
  const [active, setActive] = useState<number | null>(null)

  if (hours.length === 0) return null

  const peak = hours.reduce(
    (best, h, i) => (h.chance > hours[best].chance ? i : best),
    0,
  )

  return (
    <section
      className="rounded-3xl border border-line bg-panel p-5 backdrop-blur-md md:p-6"
      aria-label="Chance of rain over the next hours"
    >
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
        Chance of rain
      </h2>

      <Carousel ariaLabel="Chance of rain by hour" gap="gap-2">
        {hours.map((h, i) => {
          const isActive = i === active
          const showValue = i === peak || isActive
          return (
            <div
              key={`${h.label}-${i}`}
              className="flex h-40 min-w-14 flex-1 snap-start flex-col items-center"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              aria-label={`${h.label}: ${Math.round(h.chance)}% chance of rain`}
            >
              {/* Direct label row (fixed height so every track shares a baseline) */}
              <span
                className={`mb-1.5 h-4 text-[11px] font-semibold tabular-nums transition-colors ${
                  showValue ? 'text-content' : 'text-transparent'
                }`}
              >
                {Math.round(h.chance)}%
              </span>

              {/* Track + fill, anchored to the baseline */}
              <div className="relative flex w-2.5 flex-1 items-end overflow-hidden rounded-full bg-inset">
                <div
                  className={`w-full rounded-full bg-accent-ink transition-[height,filter] duration-200 ${
                    isActive ? 'brightness-125' : ''
                  }`}
                  style={{ height: `${Math.min(100, Math.max(0, h.chance))}%` }}
                />
              </div>

              <span className="mt-2 text-[11px] text-muted">{h.label}</span>
            </div>
          )
        })}
      </Carousel>
    </section>
  )
}

export default ChanceOfRain
