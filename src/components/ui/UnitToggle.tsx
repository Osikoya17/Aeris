import type { UnitSystem } from '../../utils/units'

interface UnitToggleProps {
  unit: UnitSystem
  onChange: (unit: UnitSystem) => void
}

const OPTIONS: { value: UnitSystem; label: string }[] = [
  { value: 'metric', label: '°C' },
  { value: 'imperial', label: '°F' },
]

const UnitToggle = ({ unit, onChange }: UnitToggleProps) => {
  return (
    <div className="inline-flex shrink-0 items-center rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md">
      {OPTIONS.map((option) => {
        const active = unit === option.value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`h-8 w-11 rounded-lg text-sm font-medium transition-colors ${
              active
                ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default UnitToggle
