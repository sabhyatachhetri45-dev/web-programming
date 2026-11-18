import { useCallback, useRef, useState } from 'react';
import { FilterBar } from './FilterBar.jsx';
import { Icon } from './Icon.jsx';
import { PROJECTS, TECH_FILTERS } from './projects.js';
import { ProjectList } from './ProjectList.jsx';
import { QuickView } from './QuickView.jsx';
import { useSlashToFocus } from './hooks/useSlashToFocus.js';
import './gallery.css';

const TECH_COUNTS = Object.fromEntries(
  TECH_FILTERS.map((tech) => [
    tech,
    tech === 'All' ? PROJECTS.length : PROJECTS.filter((project) => project.tech.includes(tech)).length,
  ])
);

const WEEK_COUNT = new Set(PROJECTS.filter((p) => p.week.startsWith('Week')).map((p) => p.week)).size;

export function ProjectGallery() {
  const [selectedTech, setSelectedTech] = useState('All');
  const [query, setQuery] = useState('');
  const [previewProject, setPreviewProject] = useState(null);
  const searchRef = useRef(null);

  useSlashToFocus(searchRef);

  const visibleProjects = filterProjects(PROJECTS, selectedTech, query);
  // Stable so QuickView's open/close effect only runs when the project actually changes.
  const closePreview = useCallback(() => setPreviewProject(null), []);

  function resetFilters() {
    setSelectedTech('All');
    setQuery('');
    searchRef.current?.focus();
  }

  return (
    <div className="gallery">
      <a className="g-skip-link" href="#work">
        Skip to projects
      </a>

      <header className="g-header">
        <div className="g-shell g-header__inner">
          <a className="g-brand" href="#top">
            <span className="g-brand__mark" aria-hidden="true">
              S
            </span>
            Sabhyata Chhetri
          </a>
          <nav className="g-nav" aria-label="Main">
            <a href="#work">Work</a>
            <a href="https://github.com/sabhyatachhetri45-dev" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="g-shell g-hero" aria-labelledby="g-hero-title">
          <p className="g-eyebrow">Week 11 · Portfolio gallery</p>
          <h1 className="g-hero__title" id="g-hero-title">
            Things I’ve <em>made</em> this semester.
          </h1>
          <p className="g-hero__copy">
            Web programming coursework and a few personal projects — from first API calls to React
            apps. Filter by technology, search, or open a quick preview without leaving the page.
          </p>
          <dl className="g-stats">
            <div>
              <dt>Projects</dt>
              <dd>{PROJECTS.length}</dd>
            </div>
            <div>
              <dt>Course weeks</dt>
              <dd>{WEEK_COUNT}</dd>
            </div>
            <div>
              <dt>Technologies</dt>
              <dd>{TECH_FILTERS.length - 1}</dd>
            </div>
          </dl>
        </section>

        <section className="g-work" id="work" aria-labelledby="g-work-title">
          <h2 className="g-visually-hidden" id="g-work-title">
            Projects
          </h2>

          <FilterBar
            filters={TECH_FILTERS}
            counts={TECH_COUNTS}
            selectedTech={selectedTech}
            onSelectTech={setSelectedTech}
            query={query}
            onQueryChange={setQuery}
            searchRef={searchRef}
            resultCount={visibleProjects.length}
          />

          <div className="g-shell">
            <ProjectList
              projects={visibleProjects}
              selectedTech={selectedTech}
              query={query}
              onPreview={setPreviewProject}
              onReset={resetFilters}
            />
          </div>
        </section>
      </main>

      <footer className="g-footer">
        <div className="g-shell g-footer__inner">
          <a className="g-back" href="../">
            <Icon name="arrowLeft" /> Back to portfolio
          </a>
          <p>Week 11 · Web Programming · Built with React components, props and state.</p>
        </div>
      </footer>

      <QuickView project={previewProject} onClose={closePreview} />
    </div>
  );
}

function filterProjects(projects, tech, query) {
  const needle = query.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesTech = tech === 'All' || project.tech.includes(tech);
    const matchesQuery =
      needle === '' ||
      [project.title, project.description, project.kind, project.week, ...project.tech]
        .join(' ')
        .toLowerCase()
        .includes(needle);
    return matchesTech && matchesQuery;
  });
}
