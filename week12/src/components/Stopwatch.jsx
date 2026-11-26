import { useEffect, useRef, useState } from 'react';

function formatTime(milliseconds) {
  const minutes = Math.floor(milliseconds / 60_000);
  const seconds = Math.floor((milliseconds % 60_000) / 1_000);
  const millis = Math.floor(milliseconds % 1_000);
  return { minutes: String(minutes).padStart(2, '0'), seconds: String(seconds).padStart(2, '0'), milliseconds: String(millis).padStart(3, '0') };
}

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(0);
  const elapsedAtStartRef = useRef(0);

  // A single interval exists only while running; clearing it prevents duplicate timers.
  useEffect(() => {
    if (!isRunning) return undefined;
    const intervalId = window.setInterval(() => {
      setElapsed(elapsedAtStartRef.current + (performance.now() - startTimeRef.current));
    }, 10);
    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  function start() {
    if (isRunning) return;
    elapsedAtStartRef.current = elapsed;
    startTimeRef.current = performance.now();
    setIsRunning(true);
  }

  function stop() {
    if (!isRunning) return;
    setElapsed(elapsedAtStartRef.current + (performance.now() - startTimeRef.current));
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setElapsed(0);
    elapsedAtStartRef.current = 0;
  }

  const time = formatTime(elapsed);

  return (
    <article className="sg-card">
      <div className="sg-card-topline"><span className="sg-card-number">03</span><span className="sg-card-label">SIDE EFFECT · INTERVAL</span></div>
      <h3 className="sg-card-title">Stopwatch</h3>
      <p className="sg-card-intro">Start a precise, pauseable timer. It keeps elapsed time in state and only creates one interval while running.</p>
      <div className="sg-stopwatch" aria-live="off" aria-label={`${time.minutes} minutes, ${time.seconds} seconds, ${time.milliseconds} milliseconds`}>
        <div className="sg-time-unit"><strong>{time.minutes}</strong><span>MIN</span></div><span className="sg-time-separator">:</span>
        <div className="sg-time-unit"><strong>{time.seconds}</strong><span>SEC</span></div><span className="sg-time-separator sg-time-decimal">.</span>
        <div className="sg-time-unit sg-time-millis"><strong>{time.milliseconds}</strong><span>MSEC</span></div>
      </div>
      <div className="sg-stopwatch-status"><span className={`sg-live-dot${isRunning ? ' is-running' : ''}`} />{isRunning ? 'Stopwatch is running' : elapsed ? 'Stopwatch paused' : 'Ready when you are'}</div>
      <div className="sg-stopwatch-controls">
        {!isRunning ? <button className="sg-button sg-button-primary" type="button" onClick={start}>▶ <span>Start</span></button> : <button className="sg-button sg-button-primary" type="button" onClick={stop}>Ⅱ <span>Stop</span></button>}
        <button className="sg-button sg-button-quiet" type="button" onClick={reset}>↺ <span>Reset</span></button>
      </div>
      <div className="sg-code-note"><code>setInterval(tick, 10) · clearInterval(id)</code><span>Cleanup stops the timer</span></div>
    </article>
  );
}
