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
    <div className="inline-flex shrink-0 items-center rounded-xl border border-line bg-panel p-1 backdrop-blur-md">
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
                ? 'bg-accent text-accent-content shadow-sm'
                : 'text-faint hover:text-content'
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
