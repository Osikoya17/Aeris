import type { CSSProperties, ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
  /** CSS background for the page, derived from the current weather. */
  background?: string
}

const DEFAULT_BG = 'linear-gradient(160deg, #0f1e37 0%, #0b1526 55%, #080f1c 100%)'

const DashboardLayout = ({ children, background }: DashboardLayoutProps) => {
  const style: CSSProperties = { background: background ?? DEFAULT_BG }

  return (
    <div
      className="min-h-screen w-full p-3 transition-[background] duration-700 ease-out md:p-6"
      style={style}
    >
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-350 overflow-hidden rounded-[28px] border border-white/10 bg-white/3 shadow-2xl shadow-black/50 backdrop-blur-sm md:min-h-[calc(100vh-3rem)]">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
