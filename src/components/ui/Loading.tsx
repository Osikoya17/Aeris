import type { ReactNode } from 'react'

const Block = ({ className = '' }: { className?: string }) => (
  <div className={`rounded-lg bg-white/10 ${className}`} />
)

const Panel = ({ children }: { children: ReactNode }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
    {children}
  </div>
)

/** Skeleton that mirrors the dashboard layout so the swap-in is seamless. */
const Loading = () => {
  return (
    <div className="grid animate-pulse gap-5 lg:grid-cols-[1fr_340px]">
      <div className="space-y-5">
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

        <Panel>
          <Block className="mb-5 h-3 w-32" />
          <Block className="h-32 w-full" />
          <div className="mt-4 flex gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Block key={i} className="h-24 flex-1" />
            ))}
          </div>
        </Panel>

        <Panel>
          <Block className="mb-5 h-3 w-28" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Block key={i} className="h-24" />
            ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <Block className="mb-5 h-3 w-28" />
        <div className="space-y-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Block key={i} className="h-5 w-full" />
          ))}
        </div>
      </Panel>
    </div>
  )
}

export default Loading
