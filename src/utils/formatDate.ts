/**
 * Open-Meteo returns timestamps in the location's local time with no timezone
 * offset (e.g. "2026-08-24T14:00", or "2026-08-24" for daily values). A
 * date-only string is parsed as UTC by `new Date`, which can shift the weekday
 * across a timezone boundary, so normalize those to local midnight first.
 */
const parseLocal = (iso: string): Date =>
  new Date(iso.length === 10 ? `${iso}T00:00` : iso)

/** "2026-08-24T14:00" -> "2:00 PM" (used for precise times like sunrise). */
export const formatHour = (iso: string): string =>
  parseLocal(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

/** "2026-08-24T14:00" -> "2 PM" (compact, for the hourly strip). */
export const formatHourShort = (iso: string): string =>
  parseLocal(iso).toLocaleTimeString([], { hour: 'numeric' })

/** "2026-08-24" -> "Mon" */
export const formatWeekday = (iso: string): string =>
  parseLocal(iso).toLocaleDateString([], { weekday: 'short' })

/** "2026-08-24" -> "Monday, August 24" */
export const formatLongDate = (iso: string): string =>
  parseLocal(iso).toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
