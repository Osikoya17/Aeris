import { useEffect, useRef, useState, type PointerEvent } from 'react'

export interface ChartPoint {
  label: string
  temp: number
}

interface TemperatureChartProps {
  points: ChartPoint[]
  activeIndex: number | null
  onActiveIndexChange: (index: number | null) => void
  /** Degree suffix for labels, e.g. "°". */
  suffix?: string
}

const HEIGHT = 140
const PAD_TOP = 30
const PAD_BOTTOM = 16
// Paint comes from theme tokens (see index.css): the accent for the line/markers
// and the solid popover color for marker rings, so the chart reads in both themes.

/** Catmull-Rom → cubic-bezier smoothing for a soft, readable trend line. */
const smoothPath = (pts: { x: number; y: number }[]): string => {
  if (pts.length < 2) return ''
  const d = [`M ${pts[0].x} ${pts[0].y}`]
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`)
  }
  return d.join(' ')
}

const TemperatureChart = ({
  points,
  activeIndex,
  onActiveIndexChange,
  suffix = '°',
}: TemperatureChartProps) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(640)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) setWidth(w)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (points.length === 0) return null

  const n = points.length
  const temps = points.map((p) => p.temp)
  const min = Math.min(...temps)
  const max = Math.max(...temps)
  const span = max - min || 1
  const plotBottom = HEIGHT - PAD_BOTTOM
  const plotH = plotBottom - PAD_TOP

  const xFor = (i: number) => ((i + 0.5) / n) * width
  const yFor = (t: number) => plotBottom - ((t - min) / span) * plotH

  const coords = points.map((p, i) => ({ x: xFor(i), y: yFor(p.temp), ...p }))
  const line = smoothPath(coords)
  const area = `${line} L ${coords[n - 1].x} ${plotBottom} L ${coords[0].x} ${plotBottom} Z`

  const minIndex = temps.indexOf(min)
  const maxIndex = temps.indexOf(max)
  const labelled = new Set([minIndex, maxIndex])

  const clampX = (x: number) => Math.max(22, Math.min(width - 22, x))

  const handleMove = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const i = Math.round((x / rect.width) * n - 0.5)
    onActiveIndexChange(Math.max(0, Math.min(n - 1, i)))
  }

  const active =
    activeIndex != null && activeIndex >= 0 && activeIndex < n
      ? coords[activeIndex]
      : null

  return (
    <div ref={wrapRef} className="relative w-full">
      <svg
        width={width}
        height={HEIGHT}
        viewBox={`0 0 ${width} ${HEIGHT}`}
        className="block touch-none"
        role="img"
        aria-label="Hourly temperature trend"
        onPointerMove={handleMove}
        onPointerLeave={() => onActiveIndexChange(null)}
      >
        <defs>
          <linearGradient id="aeris-temp-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--accent-ink)' }} stopOpacity="0.28" />
            <stop offset="100%" style={{ stopColor: 'var(--accent-ink)' }} stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={area} fill="url(#aeris-temp-fill)" />
        <path
          d={line}
          fill="none"
          className="stroke-accent-ink"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Crosshair at the hovered hour */}
        {active && (
          <line
            x1={active.x}
            y1={PAD_TOP - 6}
            x2={active.x}
            y2={plotBottom}
            stroke="rgba(120,130,115,0.4)"
            strokeWidth={1}
          />
        )}

        {/* Direct labels for the day's high and low only */}
        {coords.map((c, i) =>
          labelled.has(i) ? (
            <text
              key={`lbl-${i}`}
              x={clampX(c.x)}
              y={c.y - 12}
              textAnchor="middle"
              className="fill-content text-[11px] font-medium"
            >
              {Math.round(c.temp)}
              {suffix}
            </text>
          ) : null,
        )}

        {/* Extremes get a marker with a surface ring */}
        {coords.map((c, i) =>
          labelled.has(i) ? (
            <circle
              key={`dot-${i}`}
              cx={c.x}
              cy={c.y}
              r={4}
              className="fill-accent-ink"
              style={{ stroke: 'var(--popover)' }}
              strokeWidth={2}
            />
          ) : null,
        )}

        {/* Highlighted marker on hover */}
        {active && (
          <circle
            cx={active.x}
            cy={active.y}
            r={5}
            className="fill-accent-ink"
            style={{ stroke: 'var(--popover)' }}
            strokeWidth={2}
          />
        )}
      </svg>

      {/* Tooltip */}
      {active && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-popover px-2.5 py-1 text-center shadow-lg"
          style={{ left: clampX(active.x), top: active.y - 12 }}
        >
          <div className="text-sm font-semibold text-content">
            {Math.round(active.temp)}
            {suffix}
          </div>
          <div className="text-[10px] text-muted">{active.label}</div>
        </div>
      )}
    </div>
  )
}

export default TemperatureChart
