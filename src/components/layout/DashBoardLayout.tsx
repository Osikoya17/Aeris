import type { CSSProperties, ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
  /** CSS background for the page, derived from the current weather. */
  background?: string
}

const DashboardLayout = ({ children, background }: DashboardLayoutProps) => {
  // Falls back to the theme's page gradient (from index.css) until weather data
  // arrives and App supplies a conditions-derived background.
  const style: CSSProperties = { background: background ?? 'var(--page-bg)' }

  return (
    <div
      className="min-h-screen w-full p-3 transition-[background] duration-700 ease-out md:p-6"
      style={style}
    >
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-350 overflow-hidden rounded-[28px] border border-line bg-surface shadow-2xl shadow-black/30 backdrop-blur-sm md:min-h-[calc(100vh-3rem)]">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
