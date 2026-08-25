import ForecastDay, { type ForecastDayData } from './ForecastDay'
import Carousel from '../ui/Carousel'

interface WeeklyForecastProps {
  days: ForecastDayData[]
}

const WeeklyForecast = ({ days }: WeeklyForecastProps) => {
  return (
    <section className="rounded-3xl border border-line bg-panel p-5 backdrop-blur-md md:p-6">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
        Next 7 days
      </h2>

      <Carousel ariaLabel="7-day forecast" gap="gap-2.5 md:gap-3">
        {days.map((day, i) => (
          <ForecastDay key={day.date} {...day} isToday={i === 0} />
        ))}
      </Carousel>
    </section>
  )
}

export default WeeklyForecast
