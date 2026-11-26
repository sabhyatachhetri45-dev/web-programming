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

export default function App() {
  const [activeTab, setActiveTab] = useState('guide');
  const [activeExercise, setActiveExercise] = useState('title');
  const selectedExercise = exercises.find((exercise) => exercise.id === activeExercise);

  return (
    <div className="sg-app">
      <header className="sg-header">
        <a className="sg-brand" href="#top" aria-label="Week 12.2 home">
          <span className="sg-brand-mark" aria-hidden="true">W</span>
          <span>Web Programming <span className="sg-brand-week">/ Week 12.2</span></span>
        </a>
        <span className="sg-header-note">React hooks · hands-on practice</span>
      </header>

      <main className="sg-main" id="top">
        <section className="sg-hero" aria-labelledby="page-title">
          <div className="sg-hero-copy">
            <p className="sg-eyebrow"><span className="sg-eyebrow-dot" /> ASSIGNMENT · 12.2</p>
            <h1 id="page-title">Make effects<br /><span>make sense.</span></h1>
            <p className="sg-hero-description">Explore how React synchronizes with the outside world, then check what you know with a quick sprint quiz.</p>
          </div>
          <aside className="sg-hero-aside" aria-label="Assignment overview">
            <span className="sg-hero-number">03</span>
            <span className="sg-hero-rule" />
            <p>guided exercises<br />12 quiz questions</p>
            <span className="sg-hero-tag">LEARN BY DOING</span>
          </aside>
        </section>

        <nav className="sg-main-tabs" role="tablist" aria-label="Assignment sections">
          <button type="button" role="tab" id="tab-guide" aria-selected={activeTab === 'guide'} aria-controls="panel-guide" className={`sg-main-tab${activeTab === 'guide' ? ' is-active' : ''}`} onClick={() => setActiveTab('guide')}>
            <span className="sg-tab-index">01</span> Study Guide <span className="sg-tab-count">3 exercises</span>
          </button>
          <button type="button" role="tab" id="tab-quiz" aria-selected={activeTab === 'quiz'} aria-controls="panel-quiz" className={`sg-main-tab${activeTab === 'quiz' ? ' is-active' : ''}`} onClick={() => setActiveTab('quiz')}>
            <span className="sg-tab-index">02</span> Sprint Quiz <span className="sg-tab-count">12 questions</span>
          </button>
        </nav>

        {activeTab === 'guide' ? (
          <section id="panel-guide" role="tabpanel" aria-labelledby="tab-guide" className="sg-panel">
            <div className="sg-section-heading">
              <div><p className="sg-kicker">THE STUDY GUIDE</p><h2>Three small experiments.</h2></div>
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
          </section>
        ) : (
          <section id="panel-quiz" role="tabpanel" aria-labelledby="tab-quiz" className="sg-panel">
            <div className="sg-section-heading">
              <div><p className="sg-kicker">THE SPRINT QUIZ</p><h2>Ready to put it together?</h2></div>
              <p>12 questions · instant feedback · no time limit</p>
            </div>
            <SprintQuiz />
          </section>
        )}
        <footer className="sg-footer"><span>WEB PROGRAMMING · WEEK 12.2</span><span>Built for learning React, one effect at a time.</span></footer>
      </main>
    </div>
  );
}
