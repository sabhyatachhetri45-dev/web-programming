import { useState } from 'react';
import DocumentTitle from './components/DocumentTitle.jsx';
import FetchUser from './components/FetchUser.jsx';
import Stopwatch from './components/Stopwatch.jsx';
import SprintQuiz from './components/SprintQuiz.jsx';
import './App.css';

const exercises = [
  { id: 'title', label: '01 · Title sync', title: 'Document Title Sync' },
  { id: 'user', label: '02 · Fetch data', title: 'Fetch User' },
  { id: 'stopwatch', label: '03 · Intervals', title: 'Stopwatch' },
];

// Embedded directly in the existing Week 12 Class 2 Weather Dashboard page.
export default function StudyGuide() {
  const [activeTab, setActiveTab] = useState('guide');
  const [activeExercise, setActiveExercise] = useState('title');
  const selectedExercise = exercises.find((exercise) => exercise.id === activeExercise);

  return (
    <section className="sg-app" aria-labelledby="sg-heading">
      <header className="sg-embedded-header">
        <p className="sg-kicker">WEEK 12.2 · REACT HOOKS</p>
        <h2 id="sg-heading">Study Guide <span>&amp;</span> Sprint Quiz</h2>
        <p>Practice synchronizing React with browser APIs, requests, and timers, then test your useEffect knowledge.</p>
      </header>

      <nav className="sg-main-tabs" role="tablist" aria-label="Assignment sections">
        <button type="button" role="tab" id="tab-guide" aria-selected={activeTab === 'guide'} aria-controls="panel-guide" className={`sg-main-tab${activeTab === 'guide' ? ' is-active' : ''}`} onClick={() => setActiveTab('guide')}>
          <span className="sg-tab-index">01</span> Study Guide <span className="sg-tab-count">3 exercises</span>
        </button>
        <button type="button" role="tab" id="tab-quiz" aria-selected={activeTab === 'quiz'} aria-controls="panel-quiz" className={`sg-main-tab${activeTab === 'quiz' ? ' is-active' : ''}`} onClick={() => setActiveTab('quiz')}>
          <span className="sg-tab-index">02</span> Sprint Quiz <span className="sg-tab-count">12 questions</span>
        </button>
      </nav>

      {activeTab === 'guide' ? (
        <div id="panel-guide" role="tabpanel" aria-labelledby="tab-guide" className="sg-panel">
          <div className="sg-section-heading">
            <div><p className="sg-kicker">THE STUDY GUIDE</p><h3>Three small experiments.</h3></div>
            <p>Pick an exercise to explore a different useEffect pattern.</p>
          </div>
          <div className="sg-exercise-tabs" role="tablist" aria-label="Study guide exercises">
            {exercises.map((exercise) => (
              <button key={exercise.id} type="button" role="tab" aria-selected={activeExercise === exercise.id} aria-controls="exercise-panel" className={`sg-exercise-tab${activeExercise === exercise.id ? ' is-active' : ''}`} onClick={() => setActiveExercise(exercise.id)}>
                <span>{exercise.label}</span><span className="sg-exercise-tab-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div id="exercise-panel" role="tabpanel" className="sg-exercise-panel" aria-label={selectedExercise.title}>
            {activeExercise === 'title' && <DocumentTitle />}
            {activeExercise === 'user' && <FetchUser />}
            {activeExercise === 'stopwatch' && <Stopwatch />}
          </div>
          <div className="sg-tip"><span className="sg-tip-icon" aria-hidden="true">i</span><p><strong>Keep in mind</strong> — effects are for synchronizing with things outside React. If a value can be calculated during rendering, you usually don’t need an effect.</p></div>
        </div>
      ) : (
        <div id="panel-quiz" role="tabpanel" aria-labelledby="tab-quiz" className="sg-panel">
          <div className="sg-section-heading">
            <div><p className="sg-kicker">THE SPRINT QUIZ</p><h3>Ready to put it together?</h3></div>
            <p>12 questions · instant feedback · no time limit</p>
          </div>
          <SprintQuiz />
        </div>
      )}
    </section>
  );
}
