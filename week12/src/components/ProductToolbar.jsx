export function ProductToolbar({
  categories,
  categoryCounts,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar__top">
        <h2 className="toolbar__title" id="catalogue-title">
          Shop the collection
        </h2>
        <p className="toolbar__count" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'product' : 'products'}
        </p>
      </div>

      <div className="toolbar__controls">
        <div className="chips" role="group" aria-label="Filter by category">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              className="chip"
              aria-pressed={activeCategory === name}
              onClick={() => onCategoryChange(name)}
            >
              {name}
              <span className="chip__count">{categoryCounts[name]}</span>
            </button>
          ))}
        </div>

        <label className="sort">
          <span className="sort__label">Sort</span>
          <select className="sort__select" value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>
    </div>
  );
}
