import { useCallback, useState } from 'react'
import type { UnitSystem } from '../utils/units'

const STORAGE_KEY = 'aeris:unit'

const readInitial = (): UnitSystem => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'imperial' ? 'imperial' : 'metric'
  } catch {
    return 'metric'
  }
}

/** Selected unit system, persisted across visits in localStorage. */
export const useUnits = () => {
  const [unit, setUnitState] = useState<UnitSystem>(readInitial)

  const setUnit = useCallback((next: UnitSystem) => {
    setUnitState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage may be unavailable (private mode); the choice still applies for the session */
    }
  }, [])

  return { unit, setUnit }
}
