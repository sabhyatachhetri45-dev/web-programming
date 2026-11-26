import { useEffect, useState } from 'react';
import { fetchForecast, WeatherRequestError } from '../weather/openMeteo.js';

function requestKey(latitude, longitude, attempt) {
  return `${latitude},${longitude}#${attempt}`;
}

// Fetches the forecast whenever the coordinates change. Fetching is a real side effect
// (it talks to the network), so this is exactly the job useEffect is for.
export function useWeather(latitude, longitude) {
  // Bumping this re-runs the effect for the same coordinates ("Try again").
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  // The last forecast that arrived, kept so the sky doesn't go blank while the next one loads.
  const [previous, setPrevious] = useState(null);

  useEffect(() => {
    const key = requestKey(latitude, longitude, attempt);
    // If the coordinates change before this request finishes, the cleanup aborts it,
    // so an older, slower answer can never overwrite the newer place.
    const controller = new AbortController();

    fetchForecast(latitude, longitude, controller.signal)
      .then((data) => {
        setResult({ key, status: 'success', data });
        setPrevious(data);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        const known =
          error instanceof WeatherRequestError
            ? error
            : new WeatherRequestError('server', 'Something went wrong while loading the weather.');
        setResult({ key, status: 'error', error: known });
      });

    return () => controller.abort();
  }, [latitude, longitude, attempt]);

  // Loading is derived rather than stored: until a result for *these* coordinates
  // arrives, we are loading. No extra setState needed when the place changes.
  const isCurrent = result?.key === requestKey(latitude, longitude, attempt);
  const retry = () => setAttempt((count) => count + 1);

  if (!isCurrent) return { status: 'loading', previous, retry };
  return { ...result, previous, retry };
}
