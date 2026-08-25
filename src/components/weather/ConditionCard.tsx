import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export interface ConditionCardProps {
  icon: LucideIcon
  label: string
  value: string
  /** Optional secondary content below the value — a meter, bar, or note. */
  sub?: ReactNode
}

const ConditionCard = ({ icon: Icon, label, value, sub }: ConditionCardProps) => {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-inset p-4 transition-colors hover:bg-panel-hover">
      <div className="flex items-center gap-2 text-muted">
        <Icon size={15} />
        <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
      </div>

      <p className="mt-2 text-2xl font-semibold text-content">{value}</p>

      {sub != null && <div className="mt-auto pt-3">{sub}</div>}
    </div>
  )
}

export default ConditionCard
