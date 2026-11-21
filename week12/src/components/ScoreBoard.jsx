import { useState } from 'react';
import PlayerScore from './PlayerScore.jsx';

const INITIAL_PLAYERS = [
  { id: 'p1', name: 'Player 1', score: 0 },
  { id: 'p2', name: 'Player 2', score: 0 },
];

export default function ScoreBoard() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [step, setStep] = useState(1);
  const [allowNegative, setAllowNegative] = useState(false);

  function updateScore(id, delta) {
    setPlayers((previous) => previous.map((player) => {
      if (player.id !== id) return player;
      const nextScore = player.score + delta;
      return { ...player, score: allowNegative ? nextScore : Math.max(0, nextScore) };
    }));
  }

  function updateName(id, name) {
    setPlayers((previous) => previous.map((player) => (
      player.id === id ? { ...player, name } : player
    )));
  }

  function resetMatch() {
    setPlayers((previous) => previous.map((player) => ({ ...player, score: 0 })));
  }

  const totalScore = players.reduce((total, player) => total + player.score, 0);
  const maxScore = Math.max(...players.map((player) => player.score));
  const isTie = players[0].score === players[1].score;

  return (
    <section className="state-card" aria-labelledby="scoreboard-heading">
      <div className="state-card__header">
        <div>
          <span className="state-badge">Exercise 03 · Lifted State</span>
          <h2 id="scoreboard-heading" className="state-card__title">Match ScoreBoard</h2>
        </div>
        <div className="state-score-toolbar">
          <label className="state-step-selector">
            <span>Step:</span>
            <select
              value={step}
              onChange={(event) => setStep(Number(event.target.value))}
              aria-label="Score increment step"
            >
              <option value={1}>1 pt</option>
              <option value={5}>5 pts</option>
              <option value={10}>10 pts</option>
            </select>
          </label>
          <button type="button" className="state-button state-button--ghost state-button--small" onClick={resetMatch}>
            Reset
          </button>
        </div>
      </div>

      <div className="state-players-grid">
        {players.map((player) => (
          <PlayerScore
            key={player.id}
            name={player.name}
            score={player.score}
            step={step}
            allowNegative={allowNegative}
            isLeader={!isTie && player.score === maxScore}
            onNameChange={(name) => updateName(player.id, name)}
            onIncrement={() => updateScore(player.id, step)}
            onDecrement={() => updateScore(player.id, -step)}
          />
        ))}
      </div>

      <div className="state-scoreboard-footer">
        <label className="state-checkbox-label">
          <input
            type="checkbox"
            checked={allowNegative}
            onChange={(event) => setAllowNegative(event.target.checked)}
          />
          <span>Allow negative scores</span>
        </label>
        <div className="state-total" aria-live="polite">
          <span>Combined Total</span>
          <strong>{totalScore}</strong>
        </div>
      </div>
    </section>
  );
}
