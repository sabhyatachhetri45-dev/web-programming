import { useEffect, useState } from 'react';

const USER_URL = 'https://jsonplaceholder.typicode.com/users/1';

// Load one user when this exercise mounts. The controller cancels the request on unmount.
export default function FetchUser() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      try {
        const response = await fetch(USER_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`The server responded with ${response.status}.`);
        const data = await response.json();
        setUser(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message || 'Could not load the user. Please try again.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadUser();
    return () => controller.abort();
  }, []);

  return (
    <article className="sg-card">
      <div className="sg-card-topline"><span className="sg-card-number">02</span><span className="sg-card-label">SIDE EFFECT · NETWORK</span></div>
      <h3 className="sg-card-title">Fetch User</h3>
      <p className="sg-card-intro">Fetch a sample profile once when this exercise appears. Leave and the in-flight request is cancelled safely.</p>
      {loading && <p className="sg-status sg-status-loading" role="status"><span className="sg-spinner" /> Loading user profile…</p>}
      {error && <p className="sg-status sg-status-error" role="alert"><strong>Something went wrong.</strong> {error} Check your connection and revisit this exercise to try again.</p>}
      {user && (
        <div className="sg-user-card">
          <div className="sg-user-avatar" aria-hidden="true">{user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
          <div className="sg-user-name"><h4>{user.name}</h4><p>@{user.username}</p></div>
          <dl className="sg-user-details">
            <div><dt>Email</dt><dd><a href={`mailto:${user.email}`}>{user.email}</a></dd></div>
            <div><dt>Phone</dt><dd>{user.phone}</dd></div>
            <div><dt>Website</dt><dd><a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></dd></div>
            <div><dt>Company</dt><dd>{user.company.name}</dd></div>
          </dl>
        </div>
      )}
      <div className="sg-code-note"><code>useEffect(() =&gt; {'{'} fetchUser(); return () =&gt; abort(); {'}'}, [])</code><span>Runs once on mount</span></div>
    </article>
  );
}
