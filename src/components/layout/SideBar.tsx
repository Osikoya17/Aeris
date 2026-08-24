import { CloudSun, MapPinned, Map, Settings } from 'lucide-react'
import type { ReactNode } from 'react'

interface SidebarItemProps {
  icon: ReactNode
  label: string
  active?: boolean
}

const SidebarItem = ({ icon, label, active = false }: SidebarItemProps) => {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
        active
          ? 'bg-linear-to-br from-sky-400 to-sky-600 text-white shadow-lg shadow-sky-500/30'
          : 'text-slate-400 hover:bg-white/10 hover:text-white'
      }`}
    >
      {/* Active indicator rail */}
      <span
        className={`absolute -left-3 h-5 w-1 rounded-full bg-sky-400 transition-opacity ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {icon}
    </button>
  )
}

const SideBar = () => {
  return (
    <aside className="hidden w-20 shrink-0 flex-col  items-center border-r border-white/5 bg-white/3 rounded-r-4xl  py-6 md:flex">
      {/* Brand */}
      <div
        className="mb-10 flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg shadow-sky-500/30"
        title="Aeris"
        aria-label="Aeris"
      >
        <CloudSun size={22} strokeWidth={2} />
      </div>

      <nav className="flex flex-col gap-4">
        <SidebarItem icon={<CloudSun size={20} />} label="Weather" active />
        <SidebarItem icon={<MapPinned size={20} />} label="Cities" />
        <SidebarItem icon={<Map size={20} />} label="Map" />
        <SidebarItem icon={<Settings size={20} />} label="Settings" />
      </nav>
    </aside>
  )
}

export default SideBar
