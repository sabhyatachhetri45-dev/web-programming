import { useCallback, useEffect, useState } from 'react';

const MAX_HISTORY = 5;

export default function CounterWithHistory() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [step, setStep] = useState(1);

  const updateCount = useCallback((nextValue) => {
    setCount(nextValue);
    setHistory((previous) => [...previous, nextValue].slice(-MAX_HISTORY));
  }, []);

  const handleIncrement = useCallback(() => {
    updateCount(count + step);
  }, [count, step, updateCount]);

  const handleDecrement = useCallback(() => {
    updateCount(count - step);
  }, [count, step, updateCount]);

  const handleReset = useCallback(() => {
    if (count !== 0) updateCount(0);
  }, [count, updateCount]);

  const handleUndo = useCallback(() => {
    if (history.length <= 1) return;
    const previousValue = history[history.length - 2];
    setCount(previousValue);
    setHistory((previous) => previous.slice(0, -1));
  }, [history]);

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        handleUndo();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo]);

  const canUndo = history.length > 1;
  const countTone = count > 0 ? 'positive' : count < 0 ? 'negative' : 'neutral';

  return (
    <section className="state-card" aria-labelledby="counter-heading">
      <div className="state-card__header">
        <div>
          <span className="state-badge">Exercise 04 · State History &amp; Undo</span>
          <h2 id="counter-heading" className="state-card__title">Counter with History</h2>
          <p className="state-card__subtitle">
            Tracks the last {MAX_HISTORY} state transitions with step-back undo.
          </p>
        </div>

        <label className="state-step-selector">
          <span>Step:</span>
          <select
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
            aria-label="Counter step value"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>

      <div className="state-counter-stage">
        <div className={`state-counter-value ${countTone}`} aria-live="polite">
          {count}
        </div>

        <div className="state-counter-actions">
          <button
            type="button"
            className="state-button state-button--secondary"
            onClick={handleDecrement}
            aria-label={`Decrease count by ${step}`}
          >
            −{step}
          </button>

          <button
            type="button"
            className="state-button state-button--primary"
            onClick={handleIncrement}
            aria-label={`Increase count by ${step}`}
          >
            +{step}
          </button>

          <button
            type="button"
            className="state-button state-button--ghost"
            onClick={handleUndo}
            disabled={!canUndo}
            title="Shortcut: Ctrl + Z"
            aria-label="Undo last count change"
          >
            ↩ Undo
          </button>

          <button
            type="button"
            className="state-button state-button--ghost"
            onClick={handleReset}
            disabled={count === 0}
            aria-label="Reset count to zero"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="state-history-panel">
        <div className="state-history-header">
          <span className="state-history-label">Recent History (Last {MAX_HISTORY})</span>
          <span className="state-hint">[{history.join(', ')}]</span>
        </div>

        <div className="state-history-pills" role="list" aria-label="Recent count values">
          {history.map((value, index) => {
            const isCurrent = index === history.length - 1;
            return (
              <span
                key={`${index}-${value}`}
                role="listitem"
                className={`state-history-chip ${isCurrent ? 'is-current' : ''}`}
              >
                {value}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
