import type { CSSProperties, ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
  background?: string
}

const DashboardLayout = ({ children, background }: DashboardLayoutProps) => {
  const style: CSSProperties = { background: background ?? 'var(--page-bg)' }

  return (
    <div
      className="min-h-screen w-full p-3 transition-[background] duration-700 ease-out md:p-5 lg:p-6"
      style={style}
    >
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-350 overflow-hidden rounded-[20px] border border-line bg-surface backdrop-blur-sm md:min-h-[calc(100vh-2.5rem)]">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
