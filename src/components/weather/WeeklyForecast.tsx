import ForecastDay, { type ForecastDayData } from './ForecastDay'

interface WeeklyForecastProps {
  days: ForecastDayData[]
}

const WeeklyForecast = ({ days }: WeeklyForecastProps) => {
  return (
    <section className="rounded-3xl border border-line bg-panel p-5 backdrop-blur-md md:p-6">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
        Next 7 days
      </h2>

      <div className="flex gap-2.5 overflow-x-auto pb-1 md:gap-3">
        {days.map((day, i) => (
          <ForecastDay key={day.date} {...day} isToday={i === 0} />
        ))}
      </div>
    </section>
  )
}

export default WeeklyForecast
