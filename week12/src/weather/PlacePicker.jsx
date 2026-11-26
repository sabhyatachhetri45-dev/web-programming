import { useState } from 'react';
import { CitySearch } from './CitySearch.jsx';
import { CoordinateForm } from './CoordinateForm.jsx';
import { LocateButton } from './LocateButton.jsx';

const MODES = [
  { id: 'city', label: 'city name' },
  { id: 'coords', label: 'coordinates' },
];

export function PlacePicker({ onPick }) {
  const [mode, setMode] = useState('city');

  return (
    <section className="picker" aria-labelledby="picker-title">
      <div className="picker__head">
        <h2 id="picker-title">where should I look?</h2>
        <div className="mode-switch" role="group" aria-label="Search by">
          {MODES.map((option) => (
            <button
              key={option.id}
              type="button"
              className="mode-switch__btn"
              aria-pressed={mode === option.id}
              onClick={() => setMode(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {mode === 'city' ? <CitySearch onPick={onPick} /> : <CoordinateForm onPick={onPick} />}

      <div className="picker__or">
        <span>or</span>
      </div>
      <LocateButton onPick={onPick} />
    </section>
  );
}
