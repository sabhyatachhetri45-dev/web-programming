import { useRef, useState } from 'react';
import './ReactExercises.css';

function ToggleDetail() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="week12-exercise__content">
      <button
        className="week12-exercise__button"
        type="button"
        aria-expanded={isVisible}
        onClick={() => setIsVisible((previous) => !previous)}
      >
        {isVisible ? 'Hide details' : 'Show details'}
      </button>
      {isVisible && (
        <p className="week12-exercise__text">
          React state enables dynamic UIs without page reloads.
        </p>
      )}
    </div>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const nextId = useRef(0);

  function addTask(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    nextId.current += 1;
    setTasks((previous) => [...previous, { id: nextId.current, text }]);
    setInput('');
  }

  function removeTask(id) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  return (
    <div className="week12-exercise__content">
      <form className="week12-task-form" onSubmit={addTask}>
        <label className="week12-visually-hidden" htmlFor="week12-new-task">
          New task
        </label>
        <input
          id="week12-new-task"
          className="week12-exercise__input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="New task"
        />
        <button className="week12-exercise__button" type="submit">
          Add
        </button>
      </form>
      {tasks.length > 0 ? (
        <ul className="week12-task-list">
          {tasks.map((task) => (
            <li className="week12-task-list__item" key={task.id}>
              <span>{task.text}</span>
              <button
                className="week12-exercise__remove"
                type="button"
                aria-label={`Remove ${task.text}`}
                onClick={() => removeTask(task.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="week12-exercise__hint">Your tasks will appear here.</p>
      )}
    </div>
  );
}

function PlayerScore({ name, score, onIncrement, onDecrement }) {
  return (
    <div className="week12-player-score">
      <h3 className="week12-player-score__name">{name}: {score}</h3>
      <div className="week12-player-score__controls">
        <button className="week12-exercise__button" type="button" onClick={onDecrement} aria-label={`Decrease ${name} score`}>
          −
        </button>
        <button className="week12-exercise__button" type="button" onClick={onIncrement} aria-label={`Increase ${name} score`}>
          +
        </button>
      </div>
    </div>
  );
}

function ScoreBoard() {
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);

  return (
    <div className="week12-exercise__content">
      <div className="week12-scoreboard">
        <PlayerScore
          name="Player 1"
          score={playerOneScore}
          onIncrement={() => setPlayerOneScore((score) => score + 1)}
          onDecrement={() => setPlayerOneScore((score) => score - 1)}
        />
        <PlayerScore
          name="Player 2"
          score={playerTwoScore}
          onIncrement={() => setPlayerTwoScore((score) => score + 1)}
          onDecrement={() => setPlayerTwoScore((score) => score - 1)}
        />
      </div>
      <p className="week12-scoreboard__total">Total: {playerOneScore + playerTwoScore}</p>
    </div>
  );
}

export function ReactExercises() {
  return (
    <section className="week12-exercises" aria-labelledby="week12-exercises-title">
      <div className="week12-exercises__intro">
        <p className="week12-exercises__eyebrow">React practice</p>
        <h2 className="week12-exercises__title" id="week12-exercises-title">
          Week 12 Exercises
        </h2>
        <p className="week12-exercises__description">
          Practice boolean state, updating arrays in state, and sharing state between components.
        </p>
      </div>

      <div className="week12-exercises__list">
        <article className="week12-exercise">
          <div className="week12-exercise__heading">
            <span className="week12-exercise__number" aria-hidden="true">1</span>
            <h3 className="week12-exercise__title">Toggle details</h3>
          </div>
          <ToggleDetail />
        </article>

        <article className="week12-exercise">
          <div className="week12-exercise__heading">
            <span className="week12-exercise__number" aria-hidden="true">2</span>
            <h3 className="week12-exercise__title">Task list</h3>
          </div>
          <TaskList />
        </article>

        <article className="week12-exercise">
          <div className="week12-exercise__heading">
            <span className="week12-exercise__number" aria-hidden="true">3</span>
            <h3 className="week12-exercise__title">Player score board</h3>
          </div>
          <ScoreBoard />
        </article>
      </div>
    </section>
  );
}
