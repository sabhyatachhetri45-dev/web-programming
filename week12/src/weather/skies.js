import { describeWeather } from './weatherCodes.js';

// Folds the WMO codes into the five skies the page knows how to paint.
// The page's colours come straight from what Open-Meteo reports, so picking
// a rainy city turns the whole page into rain.
export function skyFor(code, isDay = true) {
  const { icon } = describeWeather(code);
  if (icon === 'clear' || icon === 'partly') return isDay ? 'day' : 'night';
  if (icon === 'cloudy' || icon === 'fog') return 'cloud';
  if (icon === 'snow') return 'snow';
  return 'rain';
}
