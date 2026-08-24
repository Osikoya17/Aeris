export interface UvBand {
  label: string
  /** Meter-fill color (WHO UV index bands). Used as a mark, never as text. */
  color: string
}

/** Top of the UV meter scale; values above this simply peg the fill. */
export const UV_SCALE_MAX = 11

/** Classify a UV index into its standard WHO risk band. */
export const uvBand = (uv: number): UvBand => {
  if (uv < 3) return { label: 'Low', color: '#22c55e' }
  if (uv < 6) return { label: 'Moderate', color: '#eab308' }
  if (uv < 8) return { label: 'High', color: '#f97316' }
  if (uv < 11) return { label: 'Very high', color: '#ef4444' }
  return { label: 'Extreme', color: '#a855f7' }
}
