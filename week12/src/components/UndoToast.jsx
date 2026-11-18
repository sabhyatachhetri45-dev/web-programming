import { useEffect, useEffectEvent } from 'react';

const DISMISS_AFTER_MS = 6000;

// Rendered with a key per removal, so each new removal remounts the toast and restarts the timer.
export function UndoToast({ message, onUndo, onDismiss }) {
  const dismiss = useEffectEvent(onDismiss);

  useEffect(() => {
    const timer = setTimeout(() => dismiss(), DISMISS_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="toast" role="status">
      <span>{message}</span>
      <button type="button" className="toast__action" onClick={onUndo}>
        Undo
      </button>
    </div>
  );
}
