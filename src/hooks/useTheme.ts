import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'aeris:theme'

/** Read the theme the inline script in index.html already resolved and applied
 *  to <html>, falling back to the OS preference if it somehow wasn't set. */
const readInitial = (): Theme => {
  if (typeof document !== 'undefined') {
    const applied = document.documentElement.dataset.theme
    if (applied === 'light' || applied === 'dark') return applied
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'dark'
  }
}

/** Active theme, applied to <html data-theme> and persisted across visits.
 *  Mirrors the useUnits hook so both preferences behave the same way. */
export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(readInitial)

  // Keep the attribute in sync in case initial state differed from the DOM
  // (e.g. storage was unavailable when the inline script ran).
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage may be unavailable (private mode); the choice still applies for the session */
    }
  }, [])

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return { theme, setTheme, toggle }
}
