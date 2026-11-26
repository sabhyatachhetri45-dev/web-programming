import { useState } from 'react';
import { useCitySearch } from '../hooks/useCitySearch.js';

export function CitySearch({ onPick }) {
  const [query, setQuery] = useState('');
  const search = useCitySearch(query);

  function handlePick(city) {
    onPick(city);
    setQuery('');
  }

  return (
    <div className="city-search">
      <label className="field-label" htmlFor="city-query">
        City name
      </label>
      <input
        id="city-query"
        className="text-input"
        type="search"
        placeholder="Try Seoul, Kathmandu, Busan…"
        autoComplete="off"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <SearchResults search={search} onPick={handlePick} />
    </div>
  );
}

function SearchResults({ search, onPick }) {
  if (search.status === 'idle') {
    return <p className="hint">Type at least two letters. Results come from Open-Meteo's geocoding API.</p>;
  }
  if (search.status === 'loading') {
    return (
      <p className="hint" role="status">
        looking for it…
      </p>
    );
  }
  if (search.status === 'error') {
    return (
      <p className="hint hint--error" role="alert">
        {search.message}
      </p>
    );
  }
  if (search.cities.length === 0) {
    return (
      <p className="hint" role="status">
        No place by that name. Check the spelling, or use coordinates instead.
      </p>
    );
  }

  return (
    <ul className="city-results" aria-label="Matching places">
      {search.cities.map((city) => (
        <li key={city.id}>
          <button type="button" className="city-result" onClick={() => onPick(city)}>
            <span className="city-result__name">{city.name}</span>
            {city.detail && <span className="city-result__detail">{city.detail}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}
