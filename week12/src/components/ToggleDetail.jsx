import { useEffect, useRef, useState } from 'react';

export default function ToggleDetail({
  title = 'React State Architecture',
  summary = 'Explore how virtual DOM reconciliation and hooks drive reactive UIs.',
  details = 'React state enables dynamic UIs without page reloads by scheduling batched re-renders whenever state setters are invoked. Using functional updates (prev => !prev) guarantees state consistency during rapid asynchronous events.',
  defaultOpen = false,
}) {
  const [isVisible, setIsVisible] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const contentId = `details-${useId()}`;
  const copyTimer = useRef(null);

  useEffect(() => {
    function handleKeyDown(event) {
      const target = event.target;
      const isTyping = target instanceof HTMLElement && (
        target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      );
      if (!isTyping && event.altKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        setIsVisible((previous) => !previous);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(copyTimer.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access may be unavailable in insecure contexts or restricted sandboxes.
    }
  }

  return (
    <section className="state-card" aria-labelledby={`${contentId}-heading`}>
      <div className="state-card__header">
        <div>
          <span className="state-badge">Exercise 01 · Boolean State</span>
          <h2 id={`${contentId}-heading`} className="state-card__title">React State Architecture</h2>
          <p className="state-card__subtitle">{summary}</p>
        </div>
        <button
          type="button"
          className="state-button state-button--primary"
          aria-expanded={isVisible}
          aria-controls={contentId}
          onClick={() => setIsVisible((previous) => !previous)}
          title="Shortcut: Alt + D"
        >
          <span>{isVisible ? 'Hide details' : 'Show details'}</span>
          <span className={`state-chevron ${isVisible ? 'is-open' : ''}`} aria-hidden="true">▾</span>
        </button>
      </div>

      <div
        id={contentId}
        role="region"
        aria-hidden={!isVisible}
        className={`state-accordion ${isVisible ? 'is-expanded' : ''}`}
        inert={!isVisible}
      >
        <div className="state-accordion__inner">
          <div className="state-detail-box">
            <p className="state-detail-box__text">{details}</p>
            <div className="state-detail-box__footer">
              <span className="state-hint">Tip: Press Alt + D to toggle</span>
              <button
                type="button"
                className="state-button state-button--ghost state-button--small"
                onClick={handleCopy}
                aria-label="Copy detail text to clipboard"
              >
                {copied ? '✓ Copied' : 'Copy text'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function useId() {
  const id = useRef(null);
  if (id.current === null) {
    id.current = globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
  return id.current;
}
