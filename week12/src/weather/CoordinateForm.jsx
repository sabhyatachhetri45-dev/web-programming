import { useState } from 'react';
import { formatCoordinates } from './format.js';
import { isValidCoordinate } from './openMeteo.js';

export function CoordinateForm({ onPick }) {
  const [latitude, setLatitude] = useState('37.566');
  const [longitude, setLongitude] = useState('126.978');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const lat = Number.parseFloat(latitude);
    const lon = Number.parseFloat(longitude);

    if (!isValidCoordinate(lat, lon)) {
      setError('Latitude goes from -90 to 90 and longitude from -180 to 180.');
      return;
    }
    setError('');
    onPick({ name: 'Pinned spot', detail: formatCoordinates(lat, lon), latitude: lat, longitude: lon });
  }

  return (
    <form className="coord-form" onSubmit={handleSubmit} noValidate>
      <div className="coord-form__fields">
        <div>
          <label className="field-label" htmlFor="lat">
            Latitude
          </label>
          <input
            id="lat"
            className="text-input"
            inputMode="decimal"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
            aria-describedby={error ? 'coord-error' : undefined}
            aria-invalid={Boolean(error)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="lon">
            Longitude
          </label>
          <input
            id="lon"
            className="text-input"
            inputMode="decimal"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
            aria-describedby={error ? 'coord-error' : undefined}
            aria-invalid={Boolean(error)}
          />
        </div>
      </div>
      {error && (
        <p className="hint hint--error" id="coord-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn--solid">
        Show the weather
      </button>
    </form>
  );
}
