import { EmptyState } from './EmptyState.jsx';
import { ProjectCard } from './ProjectCard.jsx';

export function ProjectList({ projects, selectedTech, query, onPreview, onReset }) {
  if (projects.length === 0) {
    return <EmptyState selectedTech={selectedTech} query={query} onReset={onReset} />;
  }

  return (
    <ul className="g-grid">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} onPreview={onPreview} />
        </li>
      ))}
    </ul>
  );
}
