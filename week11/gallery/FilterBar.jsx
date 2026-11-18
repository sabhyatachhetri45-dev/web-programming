import { Icon } from './Icon.jsx';

export function FilterBar({
  filters,
  counts,
  selectedTech,
  onSelectTech,
  query,
  onQueryChange,
  searchRef,
  resultCount,
}) {
  return (
    <div className="g-filterbar">
      <div className="g-shell g-filterbar__inner">
        <div className="g-chips" role="group" aria-label="Filter projects by technology">
          {filters.map((tech) => (
            <button
              key={tech}
              type="button"
              className="g-chip"
              aria-pressed={selectedTech === tech}
              onClick={() => onSelectTech(tech)}
            >
              {tech}
              <span className="g-chip__count">{counts[tech]}</span>
            </button>
          ))}
        </div>

        <div className="g-search">
          <label className="g-visually-hidden" htmlFor="g-search-input">
            Search projects
          </label>
          <Icon name="search" className="g-icon g-search__icon" />
          <input
            ref={searchRef}
            id="g-search-input"
            className="g-search__input"
            type="search"
            placeholder="Search projects"
            autoComplete="off"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          {query ? (
            <button
              type="button"
              className="g-search__clear"
              onClick={() => onQueryChange('')}
              aria-label="Clear search"
            >
              <Icon name="close" />
            </button>
          ) : (
            <kbd className="g-search__hint" aria-hidden="true">
              /
            </kbd>
          )}
        </div>

        <p className="g-filterbar__count" role="status">
          {resultCount} {resultCount === 1 ? 'project' : 'projects'}
        </p>
      </div>
    </div>
  );
}
