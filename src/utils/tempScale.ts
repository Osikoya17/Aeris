// A restrained thermal ramp (cool → warm) for temperature range bars. It steps
// blue → cyan → amber → red, skipping green to avoid a rainbow. The input is a
// normalized position in [0,1], so it works regardless of unit system.

interface Stop {
  at: number
  rgb: [number, number, number]
}

const RAMP: Stop[] = [
  { at: 0, rgb: [59, 130, 246] }, // blue-500
  { at: 0.33, rgb: [34, 211, 238] }, // cyan-400
  { at: 0.66, rgb: [245, 158, 11] }, // amber-500
  { at: 1, rgb: [239, 68, 68] }, // red-500
]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Interpolate the thermal ramp at `fraction` (clamped to [0,1]) → an rgb() string. */
export const tempColor = (fraction: number): string => {
  const f = Math.max(0, Math.min(1, fraction))
  let lo = RAMP[0]
  let hi = RAMP[RAMP.length - 1]
  for (let i = 0; i < RAMP.length - 1; i++) {
    if (f >= RAMP[i].at && f <= RAMP[i + 1].at) {
      lo = RAMP[i]
      hi = RAMP[i + 1]
      break
    }
  }
  const span = hi.at - lo.at || 1
  const t = (f - lo.at) / span
  const r = Math.round(lerp(lo.rgb[0], hi.rgb[0], t))
  const g = Math.round(lerp(lo.rgb[1], hi.rgb[1], t))
  const b = Math.round(lerp(lo.rgb[2], hi.rgb[2], t))
  return `rgb(${r}, ${g}, ${b})`
}
