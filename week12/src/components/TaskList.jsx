import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'react_exercises_tasks_v1';
const INITIAL_TASKS = [
  { id: 'initial-1', text: 'Review React useState functional updates', completed: true },
  { id: 'initial-2', text: 'Implement WCAG keyboard navigation', completed: false },
];

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : INITIAL_TASKS;
    return Array.isArray(parsed) ? parsed : INITIAL_TASKS;
  } catch {
    return INITIAL_TASKS;
  }
}

function createTaskId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function TaskList() {
  const [tasks, setTasks] = useState(loadTasks);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [deletedBackup, setDeletedBackup] = useState(null);
  const inputRef = useRef(null);
  const cancelEditOnBlur = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignore storage quota errors or disabled browser storage.
    }
  }, [tasks]);

  function addTask(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    setTasks((previous) => [
      { id: createTaskId(), text, completed: false },
      ...previous,
    ]);
    setInput('');
    setDeletedBackup(null);
    inputRef.current?.focus();
  }

  function toggleTask(id) {
    setTasks((previous) => previous.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )));
  }

  function removeTask(task) {
    setDeletedBackup(task);
    setTasks((previous) => previous.filter((item) => item.id !== task.id));
    setEditingId(null);
  }

  function undoDelete() {
    if (!deletedBackup) return;
    setTasks((previous) => [deletedBackup, ...previous]);
    setDeletedBackup(null);
  }

  function startEditing(task) {
    setEditingId(task.id);
    setEditText(task.text);
  }

  function saveEdit(id) {
    const trimmed = editText.trim();
    if (trimmed) {
      setTasks((previous) => previous.map((task) => (
        task.id === id ? { ...task, text: trimmed } : task
      )));
    }
    setEditingId(null);
  }

  function cancelEdit() {
    cancelEditOnBlur.current = true;
    setEditingId(null);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <section className="state-card" aria-labelledby="task-heading">
      <div className="state-card__header">
        <div>
          <span className="state-badge">Exercise 02 · Array State</span>
          <h2 id="task-heading" className="state-card__title">Task Manager</h2>
        </div>
        <span className="state-stat" aria-live="polite">{activeCount} remaining</span>
      </div>

      <form onSubmit={addTask} className="state-task-form">
        <label className="state-visually-hidden" htmlFor="week12-task-input">New task description</label>
        <input
          ref={inputRef}
          id="week12-task-input"
          type="text"
          className="state-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Add a new task (press Enter)..."
        />
        <button type="submit" className="state-button state-button--primary" disabled={!input.trim()}>
          Add
        </button>
      </form>

      <div className="state-filter-bar" role="group" aria-label="Filter tasks">
        {['all', 'active', 'completed'].map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={filter === tab}
            className={`state-filter ${filter === tab ? 'is-active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {deletedBackup && (
        <div className="state-undo" role="status">
          <span>Removed “{deletedBackup.text}”</span>
          <button type="button" className="state-link-button" onClick={undoDelete}>Undo</button>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <p className="state-empty">No tasks in this view.</p>
      ) : (
        <ul className="state-task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={`state-task ${task.completed ? 'is-completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                aria-label={`Mark “${task.text}” as ${task.completed ? 'incomplete' : 'complete'}`}
              />
              {editingId === task.id ? (
                <input
                  type="text"
                  className="state-input state-input--inline"
                  value={editText}
                  autoFocus
                  aria-label={`Edit task: ${task.text}`}
                  onChange={(event) => setEditText(event.target.value)}
                  onBlur={() => {
                    if (cancelEditOnBlur.current) {
                      cancelEditOnBlur.current = false;
                    } else {
                      saveEdit(task.id);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      saveEdit(task.id);
                    }
                    if (event.key === 'Escape') {
                      event.preventDefault();
                      cancelEdit();
                    }
                  }}
                />
              ) : (
                <span
                  className="state-task__text"
                  onDoubleClick={() => startEditing(task)}
                  title="Double-click to edit"
                >
                  {task.text}
                </span>
              )}
              <button
                type="button"
                className="state-icon-button state-icon-button--danger"
                onClick={() => removeTask(task)}
                aria-label={`Delete task: ${task.text}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
