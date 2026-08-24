import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Search, LoaderCircle, LocateFixed, MapPin } from 'lucide-react'
import type { GeoLocation } from '../../types/weather'
import { searchCity } from '../../services/geocodingApi'

interface SearchBarProps {
  onSelect: (place: GeoLocation) => void
  onUseLocation?: () => void
  /** True while a weather fetch is in flight (shows a spinner in the locate slot). */
  loading?: boolean
}

/** Secondary line for a result: "Region, Country" without empty separators. */
const describe = (place: GeoLocation): string =>
  [place.admin1, place.country].filter(Boolean).join(', ')

const SearchBar = ({ onSelect, onUseLocation, loading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeoLocation[]>([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [highlight, setHighlight] = useState(-1)

  const rootRef = useRef<HTMLDivElement>(null)
  // Set right after a selection so the debounce effect doesn't reopen the panel.
  const justSelected = useRef(false)

  // Debounced geocoding lookup with a stale-response guard.
  useEffect(() => {
    if (justSelected.current) {
      justSelected.current = false
      return
    }

    const term = query.trim()
    if (term.length < 2) {
      setResults([])
      setSearching(false)
      setOpen(false)
      return
    }

    let active = true
    setSearching(true)
    const timer = setTimeout(async () => {
      try {
        const data = await searchCity(term)
        if (!active) return
        setResults(data.results ?? [])
        setOpen(true)
        setHighlight(-1)
      } catch {
        if (active) setResults([])
      } finally {
        if (active) setSearching(false)
      }
    }, 300)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [query])

  // Close the dropdown on outside click.
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const choose = (place: GeoLocation) => {
    justSelected.current = true
    setQuery(place.name)
    setResults([])
    setOpen(false)
    setHighlight(-1)
    onSelect(place)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlight((h) => (h + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((h) => (h - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const pick = results[highlight] ?? results[0]
      if (pick) choose(pick)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="relative flex items-center">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 text-slate-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city…"
          role="combobox"
          aria-expanded={open}
          aria-controls="aeris-search-results"
          aria-autocomplete="list"
          className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-14 text-[15px] text-white placeholder:text-slate-500 backdrop-blur-md transition-colors focus:border-sky-400/60 focus:bg-white/8 focus:outline-none"
        />

        <div className="absolute right-2 flex items-center">
          {searching || loading ? (
            <span className="flex h-9 w-9 items-center justify-center text-slate-400">
              <LoaderCircle size={18} className="animate-spin" />
            </span>
          ) : onUseLocation ? (
            <button
              type="button"
              onClick={onUseLocation}
              title="Use my location"
              aria-label="Use my location"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-sky-300"
            >
              <LocateFixed size={18} />
            </button>
          ) : null}
        </div>
      </div>

      {open && results.length > 0 && (
        <ul
          id="aeris-search-results"
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f1a2c]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {results.map((place, i) => (
            <li key={place.id} role="option" aria-selected={i === highlight}>
              <button
                type="button"
                // onMouseDown fires before the input's blur, so the click lands.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(place)}
                onMouseEnter={() => setHighlight(i)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  i === highlight ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <MapPin size={16} className="shrink-0 text-sky-300" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-white">
                    {place.name}
                  </span>
                  {describe(place) && (
                    <span className="block truncate text-xs text-slate-400">
                      {describe(place)}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
