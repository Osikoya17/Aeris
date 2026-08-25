import { Sun, Moon } from 'lucide-react'
import type { Theme } from '../../hooks/useTheme'

interface ThemeToggleProps {
  theme: Theme
  onChange: (theme: Theme) => void
}

const OPTIONS: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: 'light', label: 'Light theme', Icon: Sun },
  { value: 'dark', label: 'Dark theme', Icon: Moon },
]

const ThemeToggle = ({ theme, onChange }: ThemeToggleProps) => {
  return (
    <div className="inline-flex shrink-0 items-center rounded-xl border border-line bg-panel p-1 backdrop-blur-md">
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            aria-label={label}
            title={label}
            onClick={() => onChange(value)}
            className={`flex h-8 w-9 items-center justify-center rounded-lg transition-colors ${
              active
                ? 'bg-accent text-accent-content shadow-sm'
                : 'text-faint hover:text-content'
            }`}
          >
            <Icon size={16} strokeWidth={2} />
          </button>
        )
      })}
    </div>
  )
}

export default ThemeToggle
