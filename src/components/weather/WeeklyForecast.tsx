import ForecastDay, { type ForecastDayData } from './ForecastDay'
import WeatherIcon from './WeatherIcon'
import Carousel from '../ui/Carousel'

interface WeeklyForecastProps {
  days: ForecastDayData[]
}

const WeeklyForecast = ({ days }: WeeklyForecastProps) => {
  return (
    <section className="rounded-3xl border border-line bg-panel p-5 backdrop-blur-md md:p-6">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
        7-day forecast
      </h2>

      {/* Mobile: horizontal carousel */}
      <div className="md:hidden">
        <Carousel ariaLabel="7-day forecast" gap="gap-2.5">
          {days.map((day, i) => (
            <div
              key={day.date}
              className={`flex min-w-20 flex-1 snap-start flex-col items-center gap-2 rounded-2xl px-2 py-3 ${
                i === 0
                  ? 'bg-accent text-accent-content'
                  : 'bg-inset text-content'
              }`}
            >
              <span
                className={`text-xs font-medium ${
                  i === 0 ? 'text-accent-content' : 'text-muted'
                }`}
              >
                {i === 0 ? 'Today' : day.day}
              </span>
              <WeatherIcon
                code={day.code}
                size="md"
                className={i === 0 ? 'text-accent-content' : 'text-accent-ink'}
              />
              <div className="flex flex-col items-center leading-tight">
                <span className="text-sm font-semibold">{day.high}°</span>
                <span
                  className={`text-xs ${
                    i === 0 ? 'text-accent-content/60' : 'text-faint'
                  }`}
                >
                  {day.low}°
                </span>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Desktop: vertical list with rain + temperature range */}
      <div className="hidden md:block">
        <div className="space-y-0.5">
          {days.map((day, i) => (
            <ForecastDay key={day.date} {...day} isToday={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WeeklyForecast
