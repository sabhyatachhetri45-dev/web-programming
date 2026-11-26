import { useEffect, useState } from 'react';

// This component sets the browser title from the input and restores it when it leaves the page.
export default function DocumentTitle() {
  const [title, setTitle] = useState('A little React practice');

  useEffect(() => {
    document.title = title || 'Untitled';
    return () => {
      document.title = 'WebPro';
    };
  }, [title]);

  return (
    <article className="sg-card">
      <div className="sg-card-topline"><span className="sg-card-number">01</span><span className="sg-card-label">SIDE EFFECT · DOCUMENT</span></div>
      <h3 className="sg-card-title">Document Title Sync</h3>
      <p className="sg-card-intro">Update the browser tab as you type. The effect follows the title value and cleans up when you leave this exercise.</p>
      <label className="sg-field-label" htmlFor="document-title-input">Type a new page title</label>
      <input id="document-title-input" className="sg-input" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Try a new title…" />
      <div className="sg-title-preview" aria-live="polite"><span className="sg-live-dot" /><span>Current document title</span><strong>{title || 'Untitled'}</strong></div>
      <div className="sg-code-note"><code>useEffect(() =&gt; {'{'} document.title = title; {'}'}, [title])</code><span>Runs when title changes</span></div>
    </article>
  );
}
