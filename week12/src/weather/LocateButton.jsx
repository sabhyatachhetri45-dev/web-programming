import { useState } from 'react';
import { formatCoordinates } from './format.js';

const GEO_ERRORS = {
  1: 'Location permission was denied. You can still search by city or coordinates.',
  2: 'Your device could not work out where you are right now.',
  3: 'Finding your location took too long. Try again.',
};

// Bonus task: navigator.geolocation. It runs on a click (an event), so it needs no effect;
// the coordinates it finds flow into the same place state, and useWeather does the rest.
export function LocateButton({ onPick }) {
  const [state, setState] = useState({ status: 'idle' });
  const isSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator;

  function handleClick() {
    setState({ status: 'locating' });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setState({ status: 'idle' });
        onPick({
          name: 'Where you are',
          detail: formatCoordinates(coords.latitude, coords.longitude),
          latitude: Number(coords.latitude.toFixed(4)),
          longitude: Number(coords.longitude.toFixed(4)),
        });
      },
      (error) => setState({ status: 'error', message: GEO_ERRORS[error.code] ?? GEO_ERRORS[2] }),
      { timeout: 10000, maximumAge: 600000 }
    );
  }

  if (!isSupported) return null;

  return (
    <div className="locate">
      <button
        type="button"
        className="btn btn--ghost"
        onClick={handleClick}
        disabled={state.status === 'locating'}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
          <path
            d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        {state.status === 'locating' ? 'Finding you…' : 'Use my location'}
      </button>
      {state.status === 'error' && (
        <p className="hint hint--error" role="alert">
          {state.message}
        </p>
      )}
    </div>
  );
}
