export interface WeatherTheme {
  /** Full CSS `background` value for the page behind the glass UI. */
  background: string
  /** The accent glow color used for the current conditions. */
  glow: string
}

export type ThemeMode = 'light' | 'dark'

/**
 * Derive a page background from the current conditions, time of day, and the
 * active light/dark theme. The accent glow shifts with the weather — warm gold
 * under clear skies, sage for cloud, deep amber for storms — so the dashboard
 * subtly reflects what's outside while staying within the forest-green + gold
 * palette. The base gradient tracks the chosen theme.
 */
export const weatherTheme = (
  code: number,
  isDay: boolean,
  mode: ThemeMode = 'dark',
): WeatherTheme => {
  const night = !isDay
  const light = mode === 'light'

  // Glow is stronger in dark mode; softer in light mode so it reads as a gentle
  // wash rather than a smudge on the pale background.
  const a = light ? 0.55 : 1
  let glow: string
  if (code <= 2) {
    glow = night
      ? `rgba(214, 179, 92, ${0.2 * a})` // muted gold by night
      : `rgba(255, 216, 95, ${0.28 * a})` // full gold under clear day skies
  } else if (code === 3 || (code >= 45 && code <= 48)) {
    glow = `rgba(150, 165, 140, ${0.16 * a})` // sage haze
  } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    glow = `rgba(120, 155, 130, ${0.18 * a})` // rain green
  } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    glow = light ? `rgba(226, 230, 210, ${0.24 * a})` : 'rgba(230, 232, 214, 0.22)'
  } else if (code >= 95) {
    glow = `rgba(206, 158, 66, ${0.26 * a})` // deep amber for storms
  } else {
    glow = `rgba(255, 216, 95, ${0.2 * a})`
  }

  const base = light
    ? 'linear-gradient(160deg, #f6f4e9 0%, #eef1e4 55%, #f3f1e4 100%)'
    : night
      ? 'linear-gradient(160deg, #171f18 0%, #10160f 55%, #0b0f0a 100%)'
      : 'linear-gradient(160deg, #202b22 0%, #182017 55%, #10160f 100%)'

  return {
    background: `radial-gradient(130% 120% at 82% -12%, ${glow} 0%, transparent 55%), ${base}`,
    glow,
  }
}
