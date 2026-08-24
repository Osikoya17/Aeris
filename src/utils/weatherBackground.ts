export interface WeatherTheme {
  /** Full CSS `background` value for the page behind the glass UI. */
  background: string
  /** The accent glow color used for the current conditions. */
  glow: string
}

/**
 * Derive a page background from the current conditions and time of day. The
 * palette stays dark enough for white text on glass, but the accent glow shifts
 * with the weather — warm sky by day, indigo at night, violet for storms, and
 * so on — so the whole dashboard subtly reflects what's outside.
 */
export const weatherTheme = (code: number, isDay: boolean): WeatherTheme => {
  const night = !isDay

  let glow: string
  if (code <= 2) {
    glow = night ? 'rgba(99, 102, 241, 0.22)' : 'rgba(56, 189, 248, 0.30)'
  } else if (code === 3 || (code >= 45 && code <= 48)) {
    glow = 'rgba(148, 163, 184, 0.18)'
  } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    glow = 'rgba(56, 189, 248, 0.20)'
  } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    glow = 'rgba(186, 230, 253, 0.24)'
  } else if (code >= 95) {
    glow = 'rgba(139, 92, 246, 0.28)'
  } else {
    glow = 'rgba(56, 189, 248, 0.22)'
  }

  const base = night
    ? 'linear-gradient(160deg, #0a1120 0%, #080e1b 55%, #05080f 100%)'
    : 'linear-gradient(160deg, #0f1e37 0%, #0b1526 55%, #080f1c 100%)'

  return {
    background: `radial-gradient(130% 120% at 82% -12%, ${glow} 0%, transparent 55%), ${base}`,
    glow,
  }
}
