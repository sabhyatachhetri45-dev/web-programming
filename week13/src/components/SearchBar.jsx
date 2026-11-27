import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="form-stack">
      <label htmlFor="search-query">Search</label>
      <input
        id="search-query"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search..."
        maxLength={100}
      />
      <p>Searching for: &quot;{query}&quot;</p>
      <span className="counter">{query.length} / 100 characters</span>
      <button type="button" className="secondary-button" onClick={() => setQuery('')}>
        Clear
      </button>
    </div>
  );
}
