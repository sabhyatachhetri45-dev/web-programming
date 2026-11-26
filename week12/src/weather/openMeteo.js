// Open-Meteo is free and needs no API key: https://open-meteo.com/en/docs
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

// Every failure the UI needs to tell apart. `kind` decides the message and whether "Try again" helps.
export class WeatherRequestError extends Error {
  constructor(kind, message) {
    super(message);
    this.name = 'WeatherRequestError';
    this.kind = kind;
  }
}

export function isValidCoordinate(latitude, longitude) {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180
  );
}

export async function fetchForecast(latitude, longitude, signal) {
  // Caught here so a bad pair never costs a request; the API would answer 400 anyway.
  if (!isValidCoordinate(latitude, longitude)) {
    throw new WeatherRequestError(
      'bad-coords',
      'Latitude must be between -90 and 90, and longitude between -180 and 180.'
    );
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '7',
  });

  const body = await getJson(`${FORECAST_URL}?${params}`, signal);
  if (!isForecast(body)) {
    throw new WeatherRequestError('bad-response', 'The forecast came back in a shape this page does not understand.');
  }
  return body;
}

export async function searchCities(name, signal) {
  const params = new URLSearchParams({ name, count: '6', language: 'en', format: 'json' });
  const body = await getJson(`${GEOCODING_URL}?${params}`, signal);

  // No match is not an error: the API just leaves `results` out.
  if (!isObject(body) || !Array.isArray(body.results)) return [];
  return body.results.filter(isCity).map((city) => ({
    id: city.id,
    name: city.name,
    detail: [city.admin1, city.country].filter(Boolean).join(', '),
    latitude: city.latitude,
    longitude: city.longitude,
  }));
}

async function getJson(url, signal) {
  let response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    // An abort means the user already moved on; let the caller ignore it quietly.
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new WeatherRequestError('network', 'Could not reach Open-Meteo. Check your connection and try again.');
  }

  if (response.status === 429) {
    throw new WeatherRequestError('rate-limit', 'Too many requests to Open-Meteo right now. Wait a minute, then try again.');
  }

  const body = await response.json().catch(() => null);

  if (response.status === 400) {
    // Open-Meteo explains bad input in `reason`, e.g. "Latitude must be in range of -90 to 90°".
    const reason = isObject(body) && typeof body.reason === 'string' ? body.reason : 'Open-Meteo rejected those coordinates.';
    throw new WeatherRequestError('bad-coords', reason);
  }
  if (!response.ok) {
    throw new WeatherRequestError('server', `Open-Meteo is having trouble (error ${response.status}). Try again shortly.`);
  }
  return body;
}

function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function isForecast(body) {
  if (!isObject(body) || !isObject(body.current) || !isObject(body.daily)) return false;
  const { current, daily } = body;
  return (
    typeof current.temperature_2m === 'number' &&
    typeof current.wind_speed_10m === 'number' &&
    typeof current.weather_code === 'number' &&
    Array.isArray(daily.time) &&
    Array.isArray(daily.temperature_2m_max) &&
    Array.isArray(daily.temperature_2m_min) &&
    Array.isArray(daily.weather_code)
  );
}

function isCity(value) {
  return (
    isObject(value) &&
    typeof value.name === 'string' &&
    typeof value.latitude === 'number' &&
    typeof value.longitude === 'number'
  );
}
