import type { ReactNode } from 'react'

const Block = ({ className = '' }: { className?: string }) => (
  <div className={`rounded-lg bg-inset ${className}`} />
)

const Panel = ({ children }: { children: ReactNode }) => (
  <div className="rounded-3xl border border-line bg-panel p-6 backdrop-blur-md">
    {children}
  </div>
)

const Loading = () => {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Mobile highlights skeleton */}
      <div className="flex gap-3 md:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <Block key={i} className="h-24 flex-1 rounded-2xl" />
        ))}
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(320px,380px)_1fr]">
        <div className="space-y-5">
          {/* Hero card */}
          <Panel>
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Block className="h-5 w-40" />
                <Block className="h-4 w-28" />
                <Block className="mt-6 h-16 w-32" />
                <Block className="h-4 w-24" />
              </div>
              <Block className="h-24 w-24 rounded-full" />
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          {/* Weekly forecast */}
          <Panel>
            <Block className="mb-5 h-3 w-28" />
            <div className="space-y-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <Block key={i} className="h-10 w-full rounded-xl" />
              ))}
            </div>
          </Panel>

          {/* Rain chart */}
          <Panel>
            <Block className="mb-5 h-3 w-32" />
            <Block className="h-32 w-full" />
            <div className="mt-4 flex gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Block key={i} className="h-24 flex-1 rounded-xl" />
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* Hourly forecast */}
      <Panel>
        <Block className="mb-5 h-3 w-32" />
        <Block className="h-32 w-full" />
        <div className="mt-4 flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Block key={i} className="h-24 flex-1 rounded-xl" />
          ))}
        </div>
      </Panel>

      {/* Weather conditions */}
      <Panel>
        <Block className="mb-5 h-3 w-28" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Block key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </Panel>
    </div>
  )
}

export default Loading
