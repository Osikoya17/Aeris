import ForecastDay, { type ForecastDayData } from './ForecastDay'

interface WeeklyForecastProps {
  days: ForecastDayData[]
}

const WeeklyForecast = ({ days }: WeeklyForecastProps) => {
  // Shared scale so every day's range bar is comparable across the week.
  const weekMin = days.length ? Math.min(...days.map((d) => d.low)) : 0
  const weekMax = days.length ? Math.max(...days.map((d) => d.high)) : 1

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        7-day forecast
      </h2>

      <div className="divide-y divide-white/5">
        {days.map((day, i) => (
          <ForecastDay
            key={day.date}
            {...day}
            weekMin={weekMin}
            weekMax={weekMax}
            isToday={i === 0}
          />
        ))}
      </div>
    </section>
  )
}

export default WeeklyForecast
