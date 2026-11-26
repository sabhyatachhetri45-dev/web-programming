import { useState } from 'react';

const QUESTIONS = [
  { question: 'What is the main purpose of React’s useEffect hook?', options: ['To synchronize a component with an external system', 'To create a new component', 'To change props passed by a parent', 'To calculate values during rendering'], answer: 0, explanation: 'useEffect is for synchronizing with systems outside React, such as a browser API, network request, timer, or subscription.' },
  { question: 'When does an effect with no dependency array run?', options: ['Only when the component first mounts', 'After every completed render', 'Only when state changes', 'Before the first render'], answer: 1, explanation: 'Without a dependency array, React runs the effect after every committed render. That can be costly or cause loops if state is updated carelessly.' },
  { question: 'What does useEffect(() => { … }, []) mean?', options: ['Run before every render', 'Run only when any state changes', 'Run after the initial mount; clean up on unmount', 'Never run the effect'], answer: 2, explanation: 'An empty dependency array means the effect has no reactive dependencies, so it runs after mount. Its cleanup runs when the component unmounts.' },
  { question: 'When does an effect with [value] as its dependency run?', options: ['Only on unmount', 'After mount and whenever value changes', 'After every render, even if value is unchanged', 'Only when value is a string'], answer: 1, explanation: 'React compares value with its previous value. The effect runs after the first commit and again when that dependency changes.' },
  { question: 'What does leaving out the dependency array do?', options: ['Runs the effect after every render', 'Runs the effect once for the lifetime of the app', 'Automatically supplies an empty array', 'Turns the effect into a cleanup'], answer: 0, explanation: 'No second argument means “after every render.” Add the reactive values the effect reads to avoid stale values and unnecessary runs.' },
  { question: 'What is the purpose of an effect cleanup function?', options: ['To force React to render again', 'To undo or release the effect’s external work', 'To clear all component state', 'To stop the browser from rendering'], answer: 1, explanation: 'Cleanup releases resources created by the effect, such as event listeners, subscriptions, timers, or in-flight requests.' },
  { question: 'How should a timer created with setInterval be cleaned up?', options: ['Call clearInterval with the interval ID', 'Set the interval to zero', 'Call setTimeout once', 'Remove the dependency array'], answer: 0, explanation: 'Save the ID returned by setInterval and call clearInterval(id) in the effect cleanup. This prevents a timer from continuing after it is no longer needed.' },
  { question: 'How can AbortController help with fetch inside an effect?', options: ['It converts the response to JSON', 'Its signal lets cleanup cancel an in-flight request', 'It retries a failed request automatically', 'It updates React state for you'], answer: 1, explanation: 'Create an AbortController, pass its signal to fetch, then call controller.abort() in cleanup. This cancels work when the component is removed or the effect reruns.' },
  { question: 'What should you generally check before reading a fetch response as JSON?', options: ['Whether response.ok is true', 'Whether the response has a CSS class', 'Whether the component has rendered twice', 'Whether clearInterval was called'], answer: 0, explanation: 'Fetch does not reject just because the server returned an HTTP error status. Check response.ok and handle unsuccessful statuses before parsing the body.' },
  { question: 'What is a race condition with overlapping fetch requests?', options: ['The browser runs out of CSS', 'An older, slower response can overwrite newer results', 'The effect runs only on weekends', 'The request skips the network'], answer: 1, explanation: 'If multiple requests are in flight, they can finish out of order. Cancel the previous request or ignore stale responses so old data does not replace newer data.' },
  { question: 'Which situation is most likely to cause a memory leak or stale work?', options: ['Clearing a timer in cleanup', 'Aborting a fetch in cleanup', 'Leaving an interval or subscription running after unmount', 'Rendering a derived value'], answer: 2, explanation: 'An unmanaged timer, listener, or subscription may keep doing work and retaining references after the component is gone. Clean it up when the effect ends.' },
  { question: 'A total can be calculated from props and state during render. Should you store it with an effect?', options: ['Yes, every derived value needs an effect', 'Yes, to prevent all re-renders', 'Usually no; calculate it during render instead', 'Only if you add an empty dependency array'], answer: 2, explanation: 'A value derived from existing props or state can usually be calculated directly during render. Avoiding redundant state and effects makes data flow simpler.' },
];

export default function SprintQuiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const question = QUESTIONS[questionIndex];
  const progress = isFinished ? 100 : ((questionIndex + (selectedAnswer === null ? 0 : 1)) / QUESTIONS.length) * 100;

  function chooseAnswer(optionIndex) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === question.answer) setScore((currentScore) => currentScore + 1);
  }

  function nextQuestion() {
    if (selectedAnswer === null) return;
    if (questionIndex === QUESTIONS.length - 1) {
      setIsFinished(true);
      return;
    }
    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  }

  if (isFinished) {
    const percentage = Math.round((score / QUESTIONS.length) * 100);
    return (
      <article className="sg-quiz-card sg-quiz-result" aria-live="polite">
        <p className="sg-kicker">QUIZ COMPLETE</p><div className="sg-result-score">{score}<span> / {QUESTIONS.length}</span></div>
        <h3>{percentage >= 80 ? 'Excellent work.' : percentage >= 50 ? 'Nice progress.' : 'Good start.'}</h3>
        <p className="sg-result-copy">You answered {score} of {QUESTIONS.length} questions correctly ({percentage}%). Revisit the study guide to keep practicing.</p>
        <div className="sg-result-track" role="progressbar" aria-label="Final quiz score" aria-valuenow={score} aria-valuemin={0} aria-valuemax={QUESTIONS.length}><span style={{ width: `${percentage}%` }} /></div>
        <button type="button" className="sg-button sg-button-primary sg-restart-button" onClick={restartQuiz}>↺ <span>Restart quiz</span></button>
      </article>
    );
  }

  return (
    <article className="sg-quiz-card">
      <div className="sg-quiz-meta"><span>QUESTION <strong>{String(questionIndex + 1).padStart(2, '0')}</strong> <span className="sg-muted">/ {String(QUESTIONS.length).padStart(2, '0')}</span></span><span>{score} correct so far</span></div>
      <div className="sg-quiz-track" role="progressbar" aria-label="Quiz progress" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div>
      <p className="sg-kicker">USEEFFECT · QUESTION {String(questionIndex + 1).padStart(2, '0')}</p>
      <h3 className="sg-question">{question.question}</h3>
      <div className="sg-options" role="group" aria-label="Answer options">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.answer;
          let stateClass = '';
          if (selectedAnswer !== null && isCorrect) stateClass = ' is-correct';
          else if (isSelected) stateClass = ' is-incorrect';
          return <button key={option} type="button" className={`sg-option${stateClass}${isSelected ? ' is-selected' : ''}`} onClick={() => chooseAnswer(index)} disabled={selectedAnswer !== null} aria-pressed={isSelected}><span className="sg-option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span><span className="sg-option-mark" aria-hidden="true">{selectedAnswer !== null && isCorrect ? '✓' : isSelected && !isCorrect ? '×' : ''}</span></button>;
        })}
      </div>
      {selectedAnswer !== null && <div className={`sg-feedback${selectedAnswer === question.answer ? ' is-correct' : ' is-incorrect'}`} role="status"><span className="sg-feedback-icon" aria-hidden="true">{selectedAnswer === question.answer ? '✓' : '!'}</span><div><strong>{selectedAnswer === question.answer ? 'That’s right!' : 'Not quite — here’s why.'}</strong><p>{question.explanation}</p></div></div>}
      <div className="sg-quiz-footer"><span className="sg-quiz-hint">{selectedAnswer === null ? 'Choose one answer to see the explanation.' : 'Answer recorded · one answer per question'}</span><button type="button" className="sg-button sg-button-primary" onClick={nextQuestion} disabled={selectedAnswer === null}>{questionIndex === QUESTIONS.length - 1 ? 'See results' : 'Next question'} <span aria-hidden="true">→</span></button></div>
    </article>
  );
}
