import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';

const DEVICES = [
  { id: 'desktop', label: 'Desktop' },
  { id: 'mobile', label: 'Mobile' },
];

// Native <dialog> gives us the focus trap, Escape-to-close and inert background for free.
export function QuickView({ project, onClose }) {
  const dialogRef = useRef(null);
  const [device, setDevice] = useState('desktop');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  function handleClose() {
    setDevice('desktop');
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="g-dialog"
      aria-labelledby="g-dialog-title"
      onClose={handleClose}
      onClick={(event) => {
        // A click that lands on the <dialog> itself (not its content) is a click on the backdrop.
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      {project && (
        <div className="g-dialog__panel">
          <header className="g-dialog__bar">
            <div className="g-dialog__heading">
              <p className="g-card__meta">{project.week}</p>
              <h2 className="g-dialog__title" id="g-dialog-title">
                {project.title}
              </h2>
            </div>

            <div className="g-segmented" role="group" aria-label="Preview size">
              {DEVICES.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={device === id}
                  onClick={() => setDevice(id)}
                >
                  <Icon name={id} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="g-dialog__actions">
              <a
                className="g-button g-button--ghost g-button--small"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open <Icon name="external" />
              </a>
              <button type="button" className="g-icon-button" onClick={handleClose} aria-label="Close preview">
                <Icon name="close" />
              </button>
            </div>
          </header>

          <div className="g-dialog__stage">
            <iframe
              key={project.id}
              className="g-dialog__frame"
              data-device={device}
              src={project.demoUrl}
              title={`Live preview of ${project.title}`}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </dialog>
  );
}
