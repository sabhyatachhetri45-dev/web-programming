export function EmptyState({ selectedTech, query, onReset }) {
  return (
    <div className="g-empty">
      <p className="g-empty__title">Nothing here yet.</p>
      <p className="g-empty__copy">{describeFilters(selectedTech, query)}</p>
      <button type="button" className="g-button g-button--primary" onClick={onReset}>
        Show all projects
      </button>
    </div>
  );
}

function describeFilters(tech, query) {
  const trimmed = query.trim();
  if (trimmed && tech !== 'All') return `No ${tech} projects match “${trimmed}”.`;
  if (trimmed) return `No projects match “${trimmed}”. Try a technology like React or API.`;
  return `No ${tech} projects yet — but give it a few weeks.`;
}
