import ToggleDetail from './ToggleDetail.jsx';
import TaskList from './TaskList.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import CounterWithHistory from './CounterWithHistory.jsx';
import './ReactExercises.css';

export function ReactExercises() {
  return (
    <section className="state-exercises" aria-labelledby="state-exercises-heading">
      <header className="state-page-header">
        <p className="state-page-header__eyebrow">Week 12 · React practice</p>
        <h2 id="state-exercises-heading">React State Patterns</h2>
        <p>Modular implementations of boolean, array, lifted, and history state.</p>
      </header>
      <div className="state-exercises__stack">
        <ToggleDetail />
        <TaskList />
        <ScoreBoard />
        <CounterWithHistory />
      </div>
    </section>
  );
}
