import { Thermometer, Umbrella, Wind, Droplets, Sun } from 'lucide-react'
import Carousel from '../ui/Carousel'
import ConditionCard from './ConditionCard'
import { uvBand } from '../../utils/uv'

interface HighlightsDeckProps {
  /** All values already converted to the active unit system. */
  feelsLike: number
  rainChance: number
  wind: number
  humidity: number
  uvIndex: number
  tempSuffix: string
  windLabel: string
}

/**
 * Mobile-only quick-glance strip of the day's key metrics as a swipeable
 * carousel. Hidden from `md` up, where the hero and the full "Air conditions"
 * grid already surface these. Reuses ConditionCard so the styling stays
 * consistent with the rest of the app.
 */
const HighlightsDeck = ({
  feelsLike,
  rainChance,
  wind,
  humidity,
  uvIndex,
  tempSuffix,
  windLabel,
}: HighlightsDeckProps) => {
  // Each card fills just over half the track so the next one peeks — a clear
  // "there's more, swipe" affordance.
  const item = 'snap-start shrink-0 basis-[52%]'

  return (
    <section className="mb-4 md:hidden" aria-label="Weather highlights">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
        Overview
      </h2>

      <Carousel ariaLabel="Weather highlights" gap="gap-3">
        <ConditionCard
          className={item}
          icon={Thermometer}
          label="Feels like"
          value={`${feelsLike}${tempSuffix}`}
        />
        <ConditionCard
          className={item}
          icon={Umbrella}
          label="Rain"
          value={`${Math.round(rainChance)}%`}
        />
        <ConditionCard
          className={item}
          icon={Wind}
          label="Wind"
          value={`${wind} ${windLabel}`}
        />
        <ConditionCard
          className={item}
          icon={Droplets}
          label="Humidity"
          value={`${Math.round(humidity)}%`}
        />
        <ConditionCard
          className={item}
          icon={Sun}
          label="UV index"
          value={`${Math.round(uvIndex)}`}
          sub={<span className="text-xs text-muted">{uvBand(uvIndex).label}</span>}
        />
      </Carousel>
    </section>
  )
}

export default HighlightsDeck
