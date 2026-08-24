export type UnitSystem = 'metric' | 'imperial'

const cToF = (celsius: number): number => (celsius * 9) / 5 + 32
const kmhToMph = (kmh: number): number => kmh / 1.609344

/** Convert a Celsius value to the chosen system and round to a whole degree. */
export const displayTemp = (celsius: number, unit: UnitSystem): number =>
  Math.round(unit === 'imperial' ? cToF(celsius) : celsius)

/** Convert a km/h value to the chosen system and round. */
export const displayWind = (kmh: number, unit: UnitSystem): number =>
  Math.round(unit === 'imperial' ? kmhToMph(kmh) : kmh)

export const tempUnitLabel = (unit: UnitSystem): string =>
  unit === 'imperial' ? '°F' : '°C'

export const windUnitLabel = (unit: UnitSystem): string =>
  unit === 'imperial' ? 'mph' : 'km/h'
