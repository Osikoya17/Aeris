/** Round a temperature and append the degree sign, e.g. 30.4 -> "30°". */
export const formatTemperature = (value: number, withUnit = false): string => {
  const rounded = Math.round(value)
  return withUnit ? `${rounded}°C` : `${rounded}°`
}
