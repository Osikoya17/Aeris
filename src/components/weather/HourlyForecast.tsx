import { useState } from 'react'
import HourlyForecastCard, { type HourData } from './HourlyForecastCard'
import TemperatureChart, { type ChartPoint } from './TemperatureChart'

interface HourlyForecastProps {
  hours: HourData[]
}

const HourlyForecast = ({ hours }: HourlyForecastProps) => {
  // Shared hover state links the chart crosshair to the card strip.
  const [active, setActive] = useState<number | null>(null)

  const points: ChartPoint[] = hours.map((h) => ({ label: h.time, temp: h.temp }))

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Today's forecast
      </h2>

      <TemperatureChart
        points={points}
        activeIndex={active}
        onActiveIndexChange={setActive}
      />

      <div className="mt-3 flex gap-1 overflow-x-auto">
        {hours.map((hour, i) => (
          <HourlyForecastCard
            key={hour.iso}
            {...hour}
            active={i === active}
            onActivate={() => setActive(i)}
            onClear={() => setActive(null)}
          />
        ))}
      </div>
    </section>
  )
}

export default HourlyForecast
