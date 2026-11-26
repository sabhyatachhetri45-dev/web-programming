import { useEffect, useState } from 'react';
import { searchCities, WeatherRequestError } from '../weather/openMeteo.js';

const MIN_LENGTH = 2;
// Wait for a pause in typing so "Seoul" costs one request, not five.
const DEBOUNCE_MS = 350;

export function useCitySearch(query) {
  const term = query.trim();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (term.length < MIN_LENGTH) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      searchCities(term, controller.signal)
        .then((cities) => setResult({ term, status: 'success', cities }))
        .catch((error) => {
          if (controller.signal.aborted) return;
          const message =
            error instanceof WeatherRequestError ? error.message : 'City search failed. Try again.';
          setResult({ term, status: 'error', message });
        });
    }, DEBOUNCE_MS);

    // Typing another letter clears the pending timer and cancels any request in flight.
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [term]);

  if (term.length < MIN_LENGTH) return { status: 'idle' };
  if (result?.term !== term) return { status: 'loading' };
  return result;
}
