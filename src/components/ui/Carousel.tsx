import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
  children: ReactNode
  /** Accessible name for the scrollable group. */
  ariaLabel: string
  /** Gap utility(ies) for the track, e.g. "gap-2" or "gap-2.5 md:gap-3". */
  gap?: string
}

interface CarouselState {
  overflow: boolean
  atStart: boolean
  atEnd: boolean
  pages: number
  page: number
}

const INITIAL: CarouselState = {
  overflow: false,
  atStart: true,
  atEnd: false,
  pages: 1,
  page: 0,
}

/** Programmatic scrolls honour the user's reduced-motion preference. */
const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

/**
 * A horizontal scroll-snap carousel. Native touch scrolling provides the swipe
 * gesture; this shell hides the scrollbar and adds pagination dots (mobile) and
 * hover arrows (desktop) — but only when the content actually overflows, so a
 * row that fits (e.g. the 7-day strip on a wide screen) reads as a plain row.
 *
 * The caller styles each child as a snap item (`snap-start` plus a width, or
 * `flex-1 min-w-*` to fill-then-overflow).
 */
const Carousel = ({ children, ariaLabel, gap = 'gap-2' }: CarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CarouselState>(INITIAL)

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const { scrollLeft, clientWidth, scrollWidth } = el
    const max = scrollWidth - clientWidth
    const overflow = max > 1
    const pages = overflow ? Math.ceil(scrollWidth / clientWidth) : 1
    const atStart = scrollLeft <= 1
    const atEnd = scrollLeft >= max - 1
    let page = clientWidth > 0 ? Math.round(scrollLeft / clientWidth) : 0
    if (atEnd) page = pages - 1
    page = Math.min(Math.max(page, 0), pages - 1)

    // Bail out of the state update when nothing changed, so the frequent
    // scroll events don't churn re-renders.
    setState((prev) =>
      prev.overflow === overflow &&
      prev.atStart === atStart &&
      prev.atEnd === atEnd &&
      prev.pages === pages &&
      prev.page === page
        ? prev
        : { overflow, atStart, atEnd, pages, page },
    )
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    measure()
    // Content width changes when weather data loads or the viewport rotates.
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [measure, children])

  const pageBy = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: scrollBehavior() })
  }

  const goTo = (p: number) => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    el.scrollTo({ left: Math.min(p * el.clientWidth, max), behavior: scrollBehavior() })
  }

  const arrowClass =
    'absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-line bg-popover p-1.5 text-content opacity-0 shadow-md transition-opacity group-hover/car:opacity-100 focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-0 md:block'

  return (
    <div className="group/car relative">
      <div
        ref={trackRef}
        role="group"
        aria-label={ariaLabel}
        onScroll={measure}
        className={`flex ${gap} overflow-x-auto no-scrollbar snap-x snap-mandatory`}
      >
        {children}
      </div>

      {state.overflow && (
        <>
          <button
            type="button"
            aria-label="Scroll to previous"
            onClick={() => pageBy(-1)}
            disabled={state.atStart}
            className={`${arrowClass} left-1`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Scroll to next"
            onClick={() => pageBy(1)}
            disabled={state.atEnd}
            className={`${arrowClass} right-1`}
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {state.overflow && state.pages > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5 md:hidden">
          {Array.from({ length: state.pages }).map((_, p) => (
            <button
              key={p}
              type="button"
              aria-label={`Go to page ${p + 1} of ${state.pages}`}
              aria-current={p === state.page}
              onClick={() => goTo(p)}
              className={`h-1.5 rounded-full transition-all ${
                p === state.page ? 'w-5 bg-accent-ink' : 'w-1.5 bg-inset'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
