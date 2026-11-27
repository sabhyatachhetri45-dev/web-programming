import { useEffect, useMemo, useState } from 'react';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch the demo user directory once; searches are filtered locally as the user types.
export default function FetchUser() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(USERS_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`The server responded with ${response.status}.`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('The server returned an unexpected user list.');
        setUsers(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Could not load users. Please try again.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  const matches = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    if (!searchTerm) return [];
    return users.filter((user) =>
      `${user.name} ${user.username}`.toLowerCase().includes(searchTerm)
    );
  }, [query, users]);

  const selectedUser = users.find((user) => user.id === selectedUserId);

  function updateQuery(event) {
    setQuery(event.target.value);
    setSelectedUserId(null);
  }

  return (
    <article className="sg-card">
      <div className="sg-card-topline"><span className="sg-card-number">02</span><span className="sg-card-label">SIDE EFFECT · NETWORK</span></div>
      <h3 className="sg-card-title">Fetch User</h3>
      <p className="sg-card-intro">Search the user directory by name or username. Matching profiles appear as you type.</p>

      <label className="sg-field-label" htmlFor="sg-user-search">Search users</label>
      <input
        id="sg-user-search"
        className="sg-input"
        type="search"
        value={query}
        onChange={updateQuery}
        placeholder="Try Leanne Graham or Bret"
        autoComplete="off"
        aria-describedby="sg-user-search-help"
      />
      <p id="sg-user-search-help" className="sg-card-intro">Search by full name or username.</p>

      {loading && <p className="sg-status sg-status-loading" role="status"><span className="sg-spinner" /> Loading users…</p>}
      {error && <p className="sg-status sg-status-error" role="alert"><strong>Something went wrong.</strong> {error} Check your connection and revisit this exercise to try again.</p>}

      {!loading && !error && query.trim() && (
        <div className="sg-user-search-results" aria-live="polite">
          <p className="sg-user-result-count" role="status">
            {matches.length ? `${matches.length} matching ${matches.length === 1 ? 'user' : 'users'}` : 'No users found. Try another name or username.'}
          </p>
          {matches.length > 0 && (
            <div className="sg-user-result-list">
              {matches.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  className={`sg-user-result${selectedUserId === user.id ? ' is-selected' : ''}`}
                  onClick={() => setSelectedUserId(user.id)}
                  aria-pressed={selectedUserId === user.id}
                >
                  <span className="sg-user-result-name">{user.name}</span>
                  <span className="sg-user-result-username">@{user.username}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedUser && (
        <div className="sg-user-card" aria-live="polite">
          <div className="sg-user-avatar" aria-hidden="true">{selectedUser.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
          <div className="sg-user-name"><h4>{selectedUser.name}</h4><p>@{selectedUser.username}</p></div>
          <dl className="sg-user-details">
            <div><dt>Email</dt><dd><a href={`mailto:${selectedUser.email}`}>{selectedUser.email}</a></dd></div>
            <div><dt>Phone</dt><dd>{selectedUser.phone}</dd></div>
            <div><dt>Website</dt><dd><a href={`https://${selectedUser.website}`} target="_blank" rel="noreferrer">{selectedUser.website}</a></dd></div>
            <div><dt>Company</dt><dd>{selectedUser.company.name}</dd></div>
          </dl>
        </div>
      )}
      <div className="sg-code-note"><code>useEffect(() =&gt; {'{'} fetchUsers(); return () =&gt; abort(); {'}'}, [])</code><span>Loads the directory once; filters as you type</span></div>
    </article>
  );
}
