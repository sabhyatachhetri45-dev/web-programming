
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './ProjectGallery.css';

const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: 'Portfolio Website',
    category: 'Frontend & Design',
    year: '2026',
    description:
      'A responsive personal developer portfolio featuring semantic HTML, modern CSS layouts, accessible navigation, and interactive project showcases.',
    techStack: ['React', 'JavaScript', 'CSS'],
    highlights: ['WCAG AA Contrast', 'Semantic HTML5', 'Zero-Layout-Shift Grid'],
    githubLink: 'https://github.com/sabhyatachhetri45-dev/portfolio',
    demoLink: 'https://sabhyatachhetri45-dev.github.io/portfolio/',
  },
  {
    id: 2,
    title: 'Student Management System',
    category: 'Full-Stack Academic',
    year: '2026',
    description:
      'An academic portal concept for organizing student enrollment, course grades, attendance records, and department schedules.',
    techStack: ['React', 'Node', 'JavaScript'],
    highlights: ['Live Roster State', 'Department Filtering', 'RESTful Architecture'],
    githubLink: 'https://github.com/sabhyatachhetri45-dev/student-management-system',
    demoLink: 'https://sabhyatachhetri45-dev.github.io/student-management-system/',
  },
  {
    id: 3,
    title: 'Weather Application',
    category: 'Data & APIs',
    year: '2026',
    description:
      'A weather dashboard concept for exploring current conditions in Seoul, Seongnam, and Busan.',
    techStack: ['JavaScript', 'CSS'],
    highlights: ['Multi-City Telemetry', 'Dynamic Metrics', 'Responsive Cards'],
    githubLink: 'https://github.com/sabhyatachhetri45-dev/weather-application',
    demoLink: 'https://sabhyatachhetri45-dev.github.io/weather-application/',
  },
  {
    id: 4,
    title: 'Online Shopping Website',
    category: 'E-Commerce UX',
    year: '2026',
    description:
      'An e-commerce storefront concept with product browsing and an interactive shopping cart.',
    techStack: ['React', 'Node', 'CSS'],
    highlights: ['Real-Time Cart Totals', 'Product Catalog', 'Micro-Interactions'],
    githubLink: 'https://github.com/sabhyatachhetri45-dev/online-shopping-website',
    demoLink: 'https://sabhyatachhetri45-dev.github.io/online-shopping-website/',
  },
];

const TECH_FILTERS = ['All', 'React', 'JavaScript', 'CSS', 'Node'];

const WEATHER_DATA = {
  Seoul: { temp: '14°C', feelsLike: '12°C', condition: 'Clear sky', humidity: '42%', wind: '11 km/h' },
  Seongnam: { temp: '13°C', feelsLike: '11°C', condition: 'Partly cloudy', humidity: '45%', wind: '9 km/h' },
  Busan: { temp: '17°C', feelsLike: '16°C', condition: 'Sunny and breezy', humidity: '50%', wind: '18 km/h' },
};

const STORE_PRODUCTS = [
  { id: 'kb', name: 'Mechanical keyboard', price: 49, mark: '⌨' },
  { id: 'ms', name: 'Wireless mouse', price: 29, mark: '◉' },
  { id: 'hb', name: 'USB-C hub', price: 35, mark: '▦' },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="pg-arrow" viewBox="0 0 20 20" fill="none">
      <path d="M4.25 10h11.5m-4.75-4.75L15.75 10 11 14.75" />
    </svg>
  );
}

function FilterBar({
  selectedTech,
  onSelectTech,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  showBookmarkedOnly,
  onToggleBookmarkedOnly,
  bookmarkCount,
  techCounts,
  searchInputRef,
}) {
  return (
    <div className="pg-controls-panel">
      <div className="pg-controls-top">
        <div className="pg-search-wrapper">
          <label htmlFor="pg-project-search" className="pg-visually-hidden">
            Search projects by title, description, or technology
          </label>
          <span className="pg-search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            ref={searchInputRef}
            id="pg-project-search"
            className="pg-search-input"
            type="search"
            placeholder="Search projects or stack... (Press /)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="pg-search-clear"
              aria-label="Clear search query"
              onClick={() => onSearchChange('')}
            >
              ×
            </button>
          )}
        </div>

        <div className="pg-controls-right">
          <button
            type="button"
            className={`pg-bookmark-filter-btn${showBookmarkedOnly ? ' is-active' : ''}`}
            aria-pressed={showBookmarkedOnly}
            onClick={onToggleBookmarkedOnly}
          >
            <span aria-hidden="true">{showBookmarkedOnly ? '★' : '☆'}</span>
            Saved ({bookmarkCount})
          </button>

          <div className="pg-sort-wrapper">
            <label htmlFor="pg-sort-select" className="pg-visually-hidden">
              Sort projects
            </label>
            <select
              id="pg-sort-select"
              className="pg-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="featured">Sort: Featured</option>
              <option value="az">Sort: A → Z</option>
              <option value="stack">Sort: Stack Size</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pg-filter-bar" role="group" aria-label="Filter projects by technology">
        {TECH_FILTERS.map((tech) => (
          <button
            className={`pg-filter-button${selectedTech === tech ? ' is-active' : ''}`}
            key={tech}
            type="button"
            aria-pressed={selectedTech === tech}
            onClick={() => onSelectTech(tech)}
          >
            <span>{tech}</span>
            <span className="pg-filter-count">{techCounts[tech] ?? 0}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, isBookmarked, onToggleBookmark, onPreview }) {
  const { id, title, category, year, description, techStack, highlights, githubLink } = project;

  return (
    <article className="pg-project-card">
      <div className="pg-card-art">
        <div className="pg-card-art-top">
          <span className="pg-card-index">
            PROJECT {String(id).padStart(2, '0')} · {year}
          </span>
          <button
            type="button"
            className={`pg-bookmark-btn${isBookmarked ? ' is-saved' : ''}`}
            aria-pressed={isBookmarked}
            aria-label={isBookmarked ? `Remove ${title} from saved projects` : `Save ${title} to bookmarks`}
            onClick={() => onToggleBookmark(id)}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
        </div>

        <span className="pg-art-orbit pg-art-orbit-one" aria-hidden="true" />
        <span className="pg-art-orbit pg-art-orbit-two" aria-hidden="true" />
        <span className="pg-art-mark" aria-hidden="true">
          {String(id).padStart(2, '0')}
        </span>
        <span className="pg-art-caption">{category}</span>
      </div>

      <div className="pg-card-content">
        <div className="pg-card-header">
          <h3 className="pg-project-title">{title}</h3>
          <span className="pg-card-arrow" aria-hidden="true">
            ↗
          </span>
        </div>

        <p className="pg-project-description">{description}</p>

        <ul className="pg-highlights-list" aria-label={`${title} key features`}>
          {highlights.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>

        <ul className="pg-tech-badges" aria-label={`${title} technologies`}>
          {techStack.map((tech) => (
            <li className="pg-badge" key={tech}>
              {tech}
            </li>
          ))}
        </ul>

        <div className="pg-card-links">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pg-button pg-button-outline"
            aria-label={`View ${title} source code on GitHub`}
          >
            GitHub code <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            onClick={() => onPreview(project)}
            className="pg-button pg-button-primary"
            aria-label={`Open interactive live demo for ${title}`}
          >
            Live demo <ArrowIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectList({ projects, bookmarkedIds, onToggleBookmark, onPreview, onReset }) {
  if (projects.length === 0) {
    return (
      <div className="pg-empty-state">
        <span className="pg-empty-mark" aria-hidden="true">
          +
        </span>
        <p>No projects match your current search or filter criteria.</p>
        <button className="pg-reset-filter" type="button" onClick={onReset}>
          Reset all filters
        </button>
      </div>
    );
  }

  return (
    <section className="pg-project-grid" aria-label="Portfolio projects">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isBookmarked={bookmarkedIds.includes(project.id)}
          onToggleBookmark={onToggleBookmark}
          onPreview={onPreview}
        />
      ))}
    </section>
  );
}

function LivePreviewModal({ project, onClose }) {
  const [cart, setCart] = useState([]);
  const [city, setCity] = useState('Seoul');
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState(['Sabhyata Chhetri', 'Minjun Kim']);
  const [viewportMode, setViewportMode] = useState('desktop');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    setViewportMode('desktop');
    setCopiedUrl(false);
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;

    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  function handleCopyUrl() {
    navigator.clipboard?.writeText(project.demoLink);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  }

  function handleAddStudent(event) {
    event.preventDefault();
    const name = studentName.trim();
    if (!name) return;

    setStudents((current) => [...current, name]);
    setStudentName('');
  }

  function handleAddToCart(product) {
    setCart((current) => [...current, product]);
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  function renderWebsiteContent() {
    switch (project.id) {
      case 1:
        return (
          <div className="pg-mini-site">
            <header className="pg-mini-nav">
              <strong>Sabhyata.dev</strong>
              <span>About · Projects · Contact</span>
            </header>
            <div className="pg-mini-hero">
              <span className="pg-mini-eyebrow">Developer portfolio</span>
              <h2>Computer science student &amp; web developer</h2>
              <p>Building accessible web experiences and intuitive interfaces.</p>
              <a
                className="pg-mini-button"
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the code ↗
              </a>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="pg-mini-site">
            <header className="pg-mini-nav">
              <strong>Gachon Academic Portal</strong>
              <span>Enrolled: {students.length}</span>
            </header>
            <div className="pg-mini-body">
              <span className="pg-mini-eyebrow">Academic community</span>
              <h2>Student roster</h2>
              <form className="pg-mini-form" onSubmit={handleAddStudent}>
                <label className="pg-visually-hidden" htmlFor="pg-student-name">
                  Student name
                </label>
                <input
                  id="pg-student-name"
                  type="text"
                  placeholder="Enter a student name"
                  value={studentName}
                  onChange={(event) => setStudentName(event.target.value)}
                />
                <button className="pg-mini-button" type="submit">
                  Add student
                </button>
              </form>
              <ul className="pg-student-list">
                {students.map((name, index) => (
                  <li key={`${name}-${index}`}>
                    <span className="pg-student-avatar" aria-hidden="true">
                      {name.charAt(0).toUpperCase()}
                    </span>
                    <span>{name}</span>
                    <small>CS major</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="pg-mini-site pg-weather-preview">
            <header className="pg-mini-nav">
              <strong>SkyPulse Weather</strong>
              <span>Local outlook</span>
            </header>
            <div className="pg-weather-content">
              <span className="pg-mini-eyebrow">Current conditions</span>
              <div className="pg-city-tabs" role="group" aria-label="Choose a city">
                {Object.keys(WEATHER_DATA).map((cityName) => (
                  <button
                    className={city === cityName ? 'is-selected' : ''}
                    key={cityName}
                    type="button"
                    aria-pressed={city === cityName}
                    onClick={() => setCity(cityName)}
                  >
                    {cityName}
                  </button>
                ))}
              </div>
              <div className="pg-weather-card">
                <span className="pg-weather-sun" aria-hidden="true">
                  ☼
                </span>
                <h2>{city}</h2>
                <strong className="pg-temperature">{WEATHER_DATA[city].temp}</strong>
                <p>{WEATHER_DATA[city].condition}</p>
                <div className="pg-weather-metrics">
                  <span>
                    Feels like <strong>{WEATHER_DATA[city].feelsLike}</strong>
                  </span>
                  <span>
                    Humidity <strong>{WEATHER_DATA[city].humidity}</strong>
                  </span>
                  <span>
                    Wind <strong>{WEATHER_DATA[city].wind}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="pg-mini-site">
            <header className="pg-mini-nav">
              <strong>BlueCart Store</strong>
              <div className="pg-cart-status" aria-live="polite">
                <span>
                  Cart ({cart.length}) · <strong>${cartTotal}</strong>
                </span>
                {cart.length > 0 && (
                  <button
                    type="button"
                    className="pg-mini-clear-cart"
                    onClick={() => setCart([])}
                  >
                    Clear
                  </button>
                )}
              </div>
            </header>
            <div className="pg-shop-content">
              <span className="pg-mini-eyebrow">Everyday tools</span>
              <h2>Thoughtful tech, made simple.</h2>
              <div className="pg-product-grid">
                {STORE_PRODUCTS.map((item) => (
                  <article className="pg-product-card" key={item.id}>
                    <span className="pg-product-mark" aria-hidden="true">
                      {item.mark}
                    </span>
                    <h3>{item.name}</h3>
                    <p>${item.price}.00</p>
                    <button
                      className="pg-mini-button"
                      type="button"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to cart
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <p className="pg-preview-unavailable">Preview unavailable.</p>;
    }
  }

  return (
    <div
      className="pg-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="pg-modal-window"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pg-modal-title"
      >
        <div className="pg-browser-bar">
          <div className="pg-browser-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="pg-browser-address">
            <span className="pg-lock-icon" aria-hidden="true">
              ◈
            </span>
            <span className="pg-url-text">{project.demoLink}</span>
            <button
              type="button"
              className="pg-copy-url-btn"
              onClick={handleCopyUrl}
              aria-label="Copy demo URL"
            >
              {copiedUrl ? 'Copied ✓' : 'Copy'}
            </button>
          </div>

          <div className="pg-viewport-toggles" role="group" aria-label="Preview viewport size">
            <button
              type="button"
              className={viewportMode === 'desktop' ? 'is-active' : ''}
              aria-pressed={viewportMode === 'desktop'}
              onClick={() => setViewportMode('desktop')}
            >
              Desktop
            </button>
            <button
              type="button"
              className={viewportMode === 'mobile' ? 'is-active' : ''}
              aria-pressed={viewportMode === 'mobile'}
              onClick={() => setViewportMode('mobile')}
            >
              Mobile
            </button>
          </div>

          <button
            className="pg-close-modal"
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close live preview modal"
          >
            <span aria-hidden="true">×</span> Close
          </button>
        </div>

        <h2 id="pg-modal-title" className="pg-visually-hidden">
          Live preview: {project.title}
        </h2>

        <div className="pg-browser-viewport">
          <div className={`pg-viewport-frame is-${viewportMode}`}>
            {renderWebsiteContent()}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProjectGallery() {
  const [selectedTech, setSelectedTech] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [activePreview, setActivePreview] = useState(null);

  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('pg_bookmarked_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('pg_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  const searchInputRef = useRef(null);
  const closePreview = useCallback(() => setActivePreview(null), []);

  useEffect(() => {
    try {
      localStorage.setItem('pg_bookmarked_projects', JSON.stringify(bookmarkedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('pg_theme', theme);
    } catch {
      // Ignore storage quota errors
    }
  }, [theme]);

  // Global "/" shortcut to focus search bar
  useEffect(() => {
    function handleGlobalKeyDown(event) {
      if (
        event.key === '/' &&
        !activePreview &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activePreview]);

  const toggleBookmark = useCallback((projectId) => {
    setBookmarkedIds((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  }, []);

  const resetAllFilters = useCallback(() => {
    setSelectedTech('All');
    setSearchQuery('');
    setSortBy('featured');
    setShowBookmarkedOnly(false);
  }, []);

  const techCounts = useMemo(() => {
    const counts = { All: SAMPLE_PROJECTS.length };
    TECH_FILTERS.slice(1).forEach((tech) => {
      counts[tech] = SAMPLE_PROJECTS.filter((p) => p.techStack.includes(tech)).length;
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = SAMPLE_PROJECTS.filter((project) => {
      const matchesTech = selectedTech === 'All' || project.techStack.includes(selectedTech);
      const matchesBookmark = !showBookmarkedOnly || bookmarkedIds.includes(project.id);
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techStack.some((t) => t.toLowerCase().includes(query));

      return matchesTech && matchesBookmark && matchesSearch;
    });

    if (sortBy === 'az') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === 'stack') {
      return [...filtered].sort((a, b) => b.techStack.length - a.techStack.length);
    }
    return filtered;
  }, [selectedTech, searchQuery, sortBy, showBookmarkedOnly, bookmarkedIds]);

  return (
    <div className="project-gallery" data-theme={theme}>
      <a className="pg-skip-link" href="#pg-main">
        Skip to content
      </a>

      <header className="pg-header" id="pg-top">
        <div className="pg-shell pg-nav">
          <a className="pg-brand" href="#pg-top" aria-label="Sabhyata Chhetri home">
            <span className="pg-brand-mark" aria-hidden="true">
              SC
            </span>
            <span>
              <strong>Sabhyata Chhetri</strong>
              <small>Web programming portfolio</small>
            </span>
          </a>

          <nav className="pg-nav-links" aria-label="Main navigation">
            <a href="#pg-projects">Projects</a>
            <a href="#pg-about">Approach</a>
            <a href="#pg-contact">Contact</a>
          </nav>

          <div className="pg-nav-actions">
            <button
              type="button"
              className="pg-theme-toggle"
              onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '☾ Dark' : '☀ Light'}
            </button>
            <a
              className="pg-nav-cta"
              href="https://github.com/sabhyatachhetri45-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      <main id="pg-main">
        <section className="pg-shell pg-hero">
          <div className="pg-hero-copy">
            <p className="pg-eyebrow">
              <span className="pg-eyebrow-mark" aria-hidden="true">
                ✳
              </span>
              Web programming portfolio
            </p>
            <h1>
              Curious ideas,
              <br />
              <span>made interactive.</span>
            </h1>
            <p className="pg-hero-description">
              A collection of projects exploring thoughtful interfaces, useful
              interactions, and the details that make the web feel welcoming.
            </p>
            <div className="pg-hero-actions">
              <a className="pg-button pg-button-primary" href="#pg-projects">
                Explore the projects <ArrowIcon />
              </a>
              <a className="pg-hero-text-link" href="#pg-about">
                How I work <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="pg-hero-meta">
              <span>4 projects</span>
              <span aria-hidden="true">·</span>
              <span>4 core technologies</span>
              <span aria-hidden="true">·</span>
              <span>Built with React</span>
            </div>
          </div>

          <div className="pg-hero-art" aria-hidden="true">
            <div className="pg-art-ring pg-art-ring-outer" />
            <div className="pg-art-ring pg-art-ring-inner" />
            <div className="pg-hero-orb">
              <span>SC</span>
            </div>
            <div className="pg-hero-note pg-hero-note-top">
              <span className="pg-note-dot" />
              <span>Ideas in progress</span>
            </div>
            <div className="pg-hero-note pg-hero-note-bottom">
              <span className="pg-note-star">✳</span>
              <span>Design with purpose</span>
            </div>
            <span className="pg-art-spark pg-spark-one">+</span>
            <span className="pg-art-spark pg-spark-two">+</span>
          </div>
        </section>

        <section className="pg-projects-section" id="pg-projects">
          <div className="pg-shell">
            <div className="pg-section-heading">
              <div>
                <p className="pg-eyebrow">Selected work</p>
                <h2>Projects with a point of view.</h2>
              </div>
              <p>
                Search or filter by technology, bookmark favorites, or launch an
                interactive desktop and mobile preview.
              </p>
            </div>

            <FilterBar
              selectedTech={selectedTech}
              onSelectTech={setSelectedTech}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showBookmarkedOnly={showBookmarkedOnly}
              onToggleBookmarkedOnly={() => setShowBookmarkedOnly((prev) => !prev)}
              bookmarkCount={bookmarkedIds.length}
              techCounts={techCounts}
              searchInputRef={searchInputRef}
            />

            <p className="pg-results-info" role="status" aria-live="polite">
              Showing <strong>{filteredProjects.length}</strong>{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'}
              {selectedTech !== 'All' && ` built with ${selectedTech}`}
              {showBookmarkedOnly && ' in saved bookmarks'}
              {searchQuery.trim() && ` matching “${searchQuery.trim()}”`}
            </p>

            <ProjectList
              projects={filteredProjects}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={toggleBookmark}
              onReset={resetAllFilters}
              onPreview={(project) => setActivePreview(project)}
            />
          </div>
        </section>

        <section className="pg-about-section" id="pg-about">
          <div className="pg-shell">
            <div className="pg-section-heading pg-about-heading">
              <div>
                <p className="pg-eyebrow">A thoughtful approach</p>
                <h2>Good interfaces work for real people.</h2>
              </div>
              <p>
                I like balancing technical foundations with details that make
                an experience clear, useful, and easy to explore.
              </p>
            </div>

            <div className="pg-feature-grid">
              <article className="pg-feature-card">
                <span className="pg-feature-index">01 / Build</span>
                <h3>Clear foundations</h3>
                <p>
                  Semantic markup and responsive layouts make the experience
                  easier to understand on every screen.
                </p>
              </article>
              <article className="pg-feature-card">
                <span className="pg-feature-index">02 / Include</span>
                <h3>Accessible by design</h3>
                <p>
                  Thoughtful contrast, keyboard access, and readable content
                  help more people use what I build.
                </p>
              </article>
              <article className="pg-feature-card">
                <span className="pg-feature-index">03 / Iterate</span>
                <h3>Always learning</h3>
                <p>
                  Each project is an opportunity to experiment, reflect, and
                  make the next version better.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="pg-shell pg-contact-section" id="pg-contact">
          <div>
            <p className="pg-eyebrow">Let&apos;s connect</p>
            <h2>Have a project or idea to share?</h2>
            <p>
              Find my code and follow along as I keep learning and building.
            </p>
          </div>
          <a
            className="pg-button pg-button-light"
            href="https://github.com/sabhyatachhetri45-dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit GitHub <ArrowIcon />
          </a>
        </section>
      </main>

      <footer className="pg-footer">
        <div className="pg-shell pg-footer-inner">
          <a className="pg-footer-brand" href="#pg-top">
            Sabhyata Chhetri
          </a>
          <p>© 2026 Sabhyata Chhetri · Built with React</p>
          <a className="pg-back-to-top" href="#pg-top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>

      <LivePreviewModal project={activePreview} onClose={closePreview} />
    </div>
  );
}