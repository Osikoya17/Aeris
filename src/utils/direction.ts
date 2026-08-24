const COMPASS = [
  'N', 'NNE', 'NE', 'ENE',
  'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW',
  'W', 'WNW', 'NW', 'NNW',
]

/** Turn a wind bearing in degrees into a 16-point compass label. */
export const compassDirection = (degrees: number): string => {
  const index = Math.round(degrees / 22.5) % 16
  return COMPASS[(index + 16) % 16]
}
