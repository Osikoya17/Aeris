import { createElement } from 'react'
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  Cloudy,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
  type LucideIcon,
} from 'lucide-react'

export type WeatherIconSize = 'sm' | 'md' | 'large'

interface WeatherIconProps {
  /** WMO weather code (see https://open-meteo.com/en/docs). */
  code?: number
  /** Simple named condition, e.g. "sunny". Used when no `code` is provided. */
  type?: string
  /** When false, clear/partly-cloudy codes render their night (moon) variant. */
  isDay?: boolean
  size?: WeatherIconSize
  className?: string
}

const SIZE_PX: Record<WeatherIconSize, number> = {
  sm: 20,
  md: 32,
  large: 96,
}

/** Map a WMO weather code to a lucide icon, respecting day/night for clear skies. */
function iconForCode(code: number, isDay: boolean): LucideIcon {
  if (code === 0) return isDay ? Sun : Moon
  if (code <= 2) return isDay ? CloudSun : CloudMoon
  if (code === 3) return Cloudy
  if (code >= 45 && code <= 48) return CloudFog
  if (code >= 51 && code <= 57) return CloudDrizzle
  if (code >= 61 && code <= 67) return CloudRain
  if (code >= 71 && code <= 77) return CloudSnow
  if (code >= 80 && code <= 82) return CloudRain
  if (code >= 85 && code <= 86) return CloudSnow
  if (code >= 95) return CloudLightning
  return Cloud
}

const TYPE_ICONS: Record<string, LucideIcon> = {
  sunny: Sun,
  clear: Sun,
  cloudy: Cloudy,
  clouds: Cloud,
  'partly-cloudy': CloudSun,
  rain: CloudRain,
  drizzle: CloudDrizzle,
  snow: CloudSnow,
  storm: CloudLightning,
  thunderstorm: CloudLightning,
  fog: CloudFog,
}

const WeatherIcon = ({
  code,
  type,
  isDay = true,
  size = 'md',
  className,
}: WeatherIconProps) => {
  const icon =
    type != null
      ? TYPE_ICONS[type.toLowerCase()] ?? CloudSun
      : iconForCode(code ?? 0, isDay)

  return createElement(icon, {
    size: SIZE_PX[size],
    strokeWidth: 1.5,
    className: className ?? 'text-sky-300',
  })
}

export default WeatherIcon
