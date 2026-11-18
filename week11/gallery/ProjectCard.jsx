import { Icon } from './Icon.jsx';

export function ProjectCard({ project, onPreview }) {
  const { title, week, kind, description, tech, demoUrl, codeUrl, image, tone } = project;

  return (
    <article className="g-card" data-tone={tone}>
      <div className="g-card__media">
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          width="1120"
          height="700"
          loading="lazy"
          decoding="async"
        />
        <button
          type="button"
          className="g-card__preview"
          onClick={() => onPreview(project)}
          aria-label={`Quick view of ${title}`}
        >
          <Icon name="eye" /> Quick view
        </button>
      </div>

      <div className="g-card__body">
        <p className="g-card__meta">
          <span>{week}</span>
          <span aria-hidden="true">·</span>
          <span>{kind}</span>
        </p>
        <h3 className="g-card__title">{title}</h3>
        <p className="g-card__description">{description}</p>

        <ul className="g-tags" aria-label={`${title} technologies`}>
          {tech.map((name) => (
            <li key={name} className="g-tag">
              {name}
            </li>
          ))}
        </ul>

        <div className="g-card__actions">
          <a
            className="g-button g-button--primary"
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${title} (opens in a new tab)`}
          >
            Live demo <Icon name="external" />
          </a>
          <a
            className="g-button g-button--ghost"
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Source code for ${title} on GitHub (opens in a new tab)`}
          >
            <Icon name="code" /> Code
          </a>
        </div>
      </div>
    </article>
  );
}
