export default function PlayerScore({
  name,
  score,
  step,
  isLeader,
  allowNegative,
  onNameChange,
  onIncrement,
  onDecrement,
}) {
  const canDecrement = allowNegative || score - step >= 0;

  return (
    <div className={`state-player ${isLeader ? 'is-leader' : ''}`}>
      <div className="state-player__header">
        <label className="state-visually-hidden" htmlFor={`player-name-${name.replace(/[^a-z0-9]/gi, '-')}`}>
          Edit {name} name
        </label>
        <input
          id={`player-name-${name.replace(/[^a-z0-9]/gi, '-')}`}
          type="text"
          className="state-player__name"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          aria-label="Edit player name"
        />
        {isLeader && <span className="state-leader-badge">★ Leading</span>}
      </div>

      <div className="state-player__score" aria-live="polite">{score}</div>

      <div className="state-player__controls">
        <button
          type="button"
          className="state-button state-button--secondary"
          onClick={onDecrement}
          disabled={!canDecrement}
          aria-label={`Decrease ${name}'s score by ${step}`}
        >
          −{step}
        </button>
        <button
          type="button"
          className="state-button state-button--primary"
          onClick={onIncrement}
          aria-label={`Increase ${name}'s score by ${step}`}
        >
          +{step}
        </button>
      </div>
    </div>
  );
}
