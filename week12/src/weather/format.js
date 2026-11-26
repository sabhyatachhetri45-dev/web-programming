// Open-Meteo returns times already in the place's own timezone (timezone=auto) and
// without an offset, e.g. "2026-11-27T00:15". Reading them as UTC and formatting
// in UTC keeps them exactly as the API sent them, whatever the visitor's clock says.
function asUtc(isoWithoutOffset) {
  return new Date(`${isoWithoutOffset}${isoWithoutOffset.length === 10 ? 'T00:00' : ''}Z`);
}

export function formatTemperature(value) {
  return `${value.toFixed(1)} °C`;
}

export function formatWeekday(isoDate) {
  return asUtc(isoDate).toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' });
}

export function formatLongDate(isoDate) {
  return asUtc(isoDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
}

export function formatClock(isoDateTime) {
  return asUtc(isoDateTime).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

export function formatCoordinates(latitude, longitude) {
  const lat = `${Math.abs(latitude).toFixed(2)}° ${latitude >= 0 ? 'N' : 'S'}`;
  const lon = `${Math.abs(longitude).toFixed(2)}° ${longitude >= 0 ? 'E' : 'W'}`;
  return `${lat}, ${lon}`;
}
