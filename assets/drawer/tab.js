/*
  The drawer tab: a small fixed tab on every task page that links back to the
  week's hub and to the previous / next task.

  Task pages are submitted homework, so this must not touch their styling.
  Everything renders inside a shadow root: the page's CSS can't reach in and
  ours can't leak out. Each page only needs:
    <script src="../assets/drawer/tab.js" defer></script>
*/

const WEEKS = {
  'week3(mon)': {
    label: 'Week 3 · Monday',
    theme: 'chip',
    // Where "next" goes after the last task, so the whole semester can be walked in order.
    after: ['../week3(fri)/index.html', 'Week 3 · Friday'],
    tasks: [
      ['task1-heading.html', 'Styling text', '#15803d'],
      ['task2-difference.html', 'Where CSS lives', '#0369a1'],
      ['task3-color.html', 'Colour', '#db2777'],
      ['task4-boxmodel.html', 'Box model', '#f59e0b'],
      ['task5-fixcode.html', 'Debugging', '#dcfce7'],
      ['task6-flexbox.html', 'Flexbox', '#1e293b'],
      ['task7-profile.html', 'Centering a card', '#16a34a'],
      ['task8-fullstyle.html', 'A full page', '#7c3aed'],
    ],
  },
  'week3(fri)': {
    label: 'Week 3 · Friday',
    theme: 'chip',
    after: ['../week4(mon).html/index.html', 'Week 4'],
    tasks: [
      ['task1.html', 'Positioning', '#ccfbf1'],
      ['task2.html', 'Hover transitions', '#99f6e4'],
      ['task3.html', 'Keyframe animation', '#5eead4'],
      ['task4.html', 'CSS variables', '#2dd4bf'],
      ['task5.html', 'position: fixed', '#14b8a6'],
      ['task6.html', 'Responsive grid', '#0f766e'],
      ['task7.html', 'All together', '#115e59'],
    ],
  },
  'week4(mon).html': {
    label: 'Week 4 · Monday',
    theme: 'sticker',
    after: ['../week5/index.html', 'Week 5'],
    tasks: [
      ['task1.html', 'Click events', '#ff7aa2'],
      ['task2.html', 'Toggling classes', '#ffc2d1'],
      ['task3.html', 'Creating elements', '#fff6cc'],
      ['task4.html', 'Filtering a list', '#c9f0e4'],
    ],
  },
  week5: {
    label: 'Week 5',
    theme: 'receipt',
    after: ['../week6(fri)/index.html', 'Week 6'],
    tasks: [
      ['task 1.html', 'A first click handler', '#fbfaf6'],
      ['task2.html', 'JavaScript basics', '#fbfaf6'],
    ],
  },
  // Monday's single task belongs to the Week 6 hub, which lives in week6(fri).
  'week6(mon)': {
    label: 'Week 6',
    theme: 'postcard',
    hub: '../week6(fri)/index.html',
    after: ['../week6(fri)/jsoonplaceholder.html', 'Data stream explorer'],
    tasks: [['task1.html', 'Random joke', '#ffe3ea']],
  },
  'week6(fri)': {
    label: 'Week 6',
    theme: 'postcard',
    before: ['../week6(mon)/task1.html', 'Random joke'],
    after: ['../week 7/index.html', 'Week 7'],
    tasks: [
      ['jsoonplaceholder.html', 'Data stream explorer', '#d9f3ea'],
      ['openmetoe weather.html', 'Weather tracker', '#dcebff'],
      ['cryptocurrency trackerr.html', 'Crypto tracker', '#fff1cf'],
      ['country demographic.html', 'Country demographics', '#e3f0dc'],
      ['github repo.html', 'GitHub repositories', '#e9e2f5'],
      ['random dog.html', 'Random dog', '#ffe6d5'],
    ],
  },
  'week 7': {
    label: 'Week 7',
    theme: 'catalogue',
    after: ['../week8(mon)/index.html', 'Week 8'],
    tasks: [
      ['task 1.html', 'A first fetch', '#fffdf7'],
      ['task2.html', 'Showing results', '#fffdf7'],
      ['task3.html', 'Validating input', '#fffdf7'],
      ['task4.html', 'Loading, empty and error states', '#fffdf7'],
      ['task5.html', 'Covers and details', '#fffdf7'],
      ['task6.html', 'The complete search', '#fffdf7'],
    ],
  },
  'week8(mon)': {
    label: 'Week 8',
    theme: 'pass',
    after: ['../week8(fri)/index.html', 'Week 8 Friday'],
    tasks: [
      ['contact form.html', 'Contact Form', '#cfe0f7'],
      ['student registration.html', 'Student Registration', '#cfe0f7'],
    ],
  },
  'week8(fri)': {
    label: 'Week 8',
    theme: 'pass',
    after: ['../week9 mon/index.html', 'Week 9'],
    tasks: [
      ['why forms.html', 'Why Forms?', '#ffd9e2'],
      ['the element.html', 'The Form Element', '#ffd9e2'],
      ['input types.html', 'Input Types', '#ffd9e2'],
      ['grouping fields.html', 'Grouping Fields', '#ffd9e2'],
      ['labels_&_accessibility.html', 'Labels and Accessibility', '#ffd9e2'],
      ['validation attributes.html', 'Validation Attributes', '#ffd9e2'],
      ['css_validation_pseudo_classes.html', 'CSS Validation Pseudo-Classes', '#ffd9e2'],
      ['homework registration.html', 'Registration Homework', '#ffd9e2'],
    ],
  },
  // Week 9 has one hub for both days; it lives in "week9 mon".
  'week9 mon': {
    label: 'Week 9',
    theme: 'booth',
    after: ['../week9 fri/accessibility-task.html', 'Accessibility Audit Report'],
    tasks: [['updated performance.html', 'Website Improvements Report', '#cdb8ef']],
  },
  'week9 fri': {
    label: 'Week 9',
    theme: 'booth',
    hub: '../week9 mon/index.html',
    before: ['../week9 mon/updated performance.html', 'Website Improvements Report'],
    after: ['../week10/index.html', 'Week 10'],
    tasks: [
      ['accessibility-task.html', 'Accessibility Audit Report', '#a8e3cf'],
      ['updatedwebsite.html', 'The updated website', '#1d1a22'],
    ],
  },
  // Week 10's single task is itself the week's page, so there is no separate hub.
  week10: {
    label: 'Week 10',
    theme: 'subway',
    before: ['../week9 fri/updatedwebsite.html', 'The updated website'],
    after: ['../week11/', 'Week 11'],
    tasks: [['index.html', 'Portfolio and development notebook', '#3cb44a']],
  },
};

// Hub pages read this to show which tasks a visitor has already opened.
const SEEN_KEY = 'drawer:seen';

function rememberVisit(folder, file) {
  try {
    const saved = JSON.parse(localStorage.getItem(SEEN_KEY) ?? '[]');
    const seen = new Set(Array.isArray(saved) ? saved : []);
    seen.add(`${folder}/${file}`);
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
  } catch {
    // Storage can be blocked (private mode); the tab still works without it.
  }
}

const THEMES = {
  // Week 3: a paint chip lying on the desk.
  chip: `
    .tab { --paper: #fffdf9; --ink: #2b2622; --soft: #675d54; --ground: #f3ece1; }
    .hub { display: flex; align-items: stretch; }
    .hub::before {
      content: "";
      width: 2.25rem;
      align-self: stretch;
      margin: 0.3rem 0 0.3rem 0.3rem;
      border-radius: 0.45rem;
      background: var(--swatch);
      background-image: radial-gradient(circle at 0.65rem 0.65rem, var(--ground) 0 0.28rem, transparent 0.3rem);
      box-shadow: inset 0 0 0 1px rgb(43 38 34 / 0.08);
    }
  `,
  // Week 5: a tiny printed receipt.
  receipt: `
    .tab { --paper: #fffdf9; --ink: #2a2a2e; --soft: #5d5d66; }
    .hub { display: flex; align-items: center; }
    .hub::before {
      content: "";
      width: 1.6rem;
      height: 2.1rem;
      margin-left: 0.45rem;
      background:
        linear-gradient(#5d5d66 0 0) 0.3rem 0.45rem / 1rem 2px no-repeat,
        linear-gradient(#5d5d66 0 0) 0.3rem 0.8rem / 1rem 2px no-repeat,
        linear-gradient(#5d5d66 0 0) 0.3rem 1.15rem / 0.6rem 2px no-repeat,
        #fbfaf6;
      border-radius: 2px;
      box-shadow: 0 0 0 1px rgb(42 42 46 / 0.2), 0 2px 4px rgb(42 42 46 / 0.2);
    }
  `,
  // Week 6: a tiny airmail envelope.
  postcard: `
    .tab { --paper: #fffdf9; --ink: #2c2430; --soft: #63566a; }
    .hub { display: flex; align-items: center; }
    .hub::before {
      content: "";
      width: 2.2rem;
      height: 1.5rem;
      margin-left: 0.4rem;
      border-radius: 3px;
      background:
        linear-gradient(var(--swatch), var(--swatch)) padding-box,
        repeating-linear-gradient(-45deg, #d64550 0 4px, #fff 4px 6px, #2f5aa8 6px 10px, #fff 10px 12px) border-box;
      border: 3px solid transparent;
    }
  `,
  // Week 7: a tiny library catalogue card.
  catalogue: `
    .tab { --paper: #fffdf9; --ink: #26232b; --soft: #5c5866; }
    .hub { display: flex; align-items: center; }
    .hub::before {
      content: "";
      width: 2.3rem;
      height: 1.6rem;
      margin-left: 0.4rem;
      border-radius: 2px;
      background:
        radial-gradient(circle at 50% 80%, #26232b 0 2px, transparent 2.5px),
        linear-gradient(#e08a92 0 0) 0 0.4rem / 100% 1.5px no-repeat,
        repeating-linear-gradient(transparent 0 4px, #b8cbe6 4px 5px) 0 0.55rem / 100% 100% no-repeat,
        var(--swatch);
      box-shadow: 0 0 0 1px rgb(38 35 43 / 0.25), 0 2px 3px rgb(38 35 43 / 0.2);
    }
  `,
  // Week 8: a tiny boarding pass with a tear-off stub.
  pass: `
    .tab { --paper: #fffdf9; --ink: #23202a; --soft: #5e5867; }
    .hub { display: flex; align-items: center; }
    .hub::before {
      content: "";
      width: 2.4rem;
      height: 1.45rem;
      margin-left: 0.4rem;
      border-radius: 3px;
      background:
        linear-gradient(90deg, transparent 70%, rgb(35 32 42 / 0.35) 70% 72%, transparent 72%),
        linear-gradient(var(--swatch), var(--swatch)) top / 100% 0.45rem no-repeat,
        #fff;
      box-shadow: 0 0 0 1px rgb(35 32 42 / 0.25), 0 2px 3px rgb(35 32 42 / 0.2);
    }
  `,
  // Week 9: a tiny four-cut photo strip.
  booth: `
    .tab { --paper: #fffdf9; --ink: #2a1f3d; --soft: #5e5867; }
    .hub { display: flex; align-items: center; }
    .hub::before {
      content: "";
      width: 1.05rem;
      height: 2.2rem;
      margin-left: 0.6rem;
      border-radius: 2px;
      background:
        repeating-linear-gradient(#2b2230 0 0.42rem, transparent 0.42rem 0.52rem) 0.15rem 0.15rem / calc(100% - 0.3rem) calc(100% - 0.55rem) no-repeat,
        var(--swatch);
      box-shadow: 0 0 0 1px rgb(42 31 61 / 0.25), 0 2px 3px rgb(42 31 61 / 0.25);
      transform: rotate(-4deg);
    }
  `,
  // Week 10: a subway line dot, the colour of line 2.
  subway: `
    .tab { --paper: #fffdf9; --ink: #1f2328; --soft: #59606b; }
    .hub { display: flex; align-items: center; }
    .hub::before {
      content: "";
      width: 2.4rem;
      height: 1.1rem;
      margin-left: 0.4rem;
      background:
        radial-gradient(circle, #fff 0 0.22rem, var(--swatch) 0.24rem 0.42rem, transparent 0.44rem) center / 1.1rem 1.1rem no-repeat,
        linear-gradient(var(--swatch), var(--swatch)) center / 100% 0.3rem no-repeat;
    }
  `,
  // Week 4: a round die-cut sticker.
  sticker: `
    .tab { --paper: #fffdf9; --ink: #2f2530; --soft: #6b5a64; }
    .hub { display: flex; align-items: center; }
    .hub::before {
      content: "";
      width: 2rem;
      height: 2rem;
      margin-left: 0.35rem;
      border-radius: 50%;
      background: var(--swatch);
      box-shadow: 0 0 0 3px #fff, 0 1px 3px 3px rgb(47 37 48 / 0.18);
    }
  `,
};

// Captured now: document.currentScript is null once the script has finished running.
const SCRIPT_URL = document.currentScript?.src ?? location.href;
const FONT_FACES = `
  @font-face { font-family: "Gowun Dodum"; src: url("${new URL('../fonts/gowun-dodum.woff2', SCRIPT_URL)}") format("woff2"); font-display: swap; }
`;

const ARROW_LEFT = '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ARROW_RIGHT = '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const BASE_CSS = `
  :host {
    all: initial;
    position: fixed;
    z-index: 2147483000;
    left: max(0.75rem, env(safe-area-inset-left));
    bottom: max(0.75rem, env(safe-area-inset-bottom));
  }
  * { box-sizing: border-box; }
  .tab {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    padding: 0.2rem;
    font-family: "Gowun Dodum", "Apple SD Gothic Neo", system-ui, sans-serif;
    font-size: 13px;
    line-height: 1.25;
    color: var(--ink);
    background: var(--paper);
    border-radius: 0.7rem;
    box-shadow: 0 1px 2px rgb(40 30 20 / 0.12), 0 10px 24px -10px rgb(40 30 20 / 0.4);
    transform: rotate(-1deg);
    transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .tab:hover, .tab:focus-within { transform: rotate(0deg) translateY(-2px); }
  /* Slides out of the way while the reader scrolls down through the homework. */
  :host([data-tucked]) .tab:not(:focus-within) { transform: translateY(calc(100% + 1.5rem)) rotate(-1deg); }
  a { color: inherit; text-decoration: none; border-radius: 0.5rem; }
  a:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
  .step {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.75rem;
    color: var(--soft);
  }
  .step:hover { color: var(--ink); background: rgb(43 38 34 / 0.06); }
  .step[aria-disabled="true"] { opacity: 0.3; pointer-events: none; }
  .hub { min-height: 2.75rem; }
  .hub:hover .where { text-decoration: underline; text-underline-offset: 3px; }
  .text { display: grid; align-content: center; padding: 0.2rem 0.6rem 0.25rem 0.55rem; }
  .where { font-size: 12px; color: var(--soft); }
  .what { font-size: 14px; white-space: nowrap; max-width: 11rem; overflow: hidden; text-overflow: ellipsis; }
  @media print { :host { display: none; } }
  @media (prefers-reduced-motion: reduce) { .tab { transition: none; } }
`;

function currentPlace() {
  const parts = decodeURIComponent(location.pathname).split('/').filter(Boolean);
  const file = parts.at(-1);
  const folder = parts.at(-2);
  const week = WEEKS[folder];
  if (!week) return null;
  const index = week.tasks.findIndex(([name]) => name.toLowerCase() === file?.toLowerCase());
  if (index === -1) return null;
  return { week, index, folder, file: week.tasks[index][0] };
}

function stepLink(href, label, icon) {
  return `<a class="step" href="${encodeURI(href)}" aria-label="${label}" title="${label}">${icon}</a>`;
}

// First task steps back to the week's hub; last task steps on to the next week.
function prevLink(week, index) {
  const task = week.tasks[index - 1];
  if (task) return stepLink(task[0], `Previous task: ${task[1]}`, ARROW_LEFT);
  if (week.before) return stepLink(week.before[0], `Previous task: ${week.before[1]}`, ARROW_LEFT);
  return stepLink(week.hub ?? 'index.html', `Back to ${week.label}`, ARROW_LEFT);
}

function nextLink(week, index) {
  const task = week.tasks[index + 1];
  if (task) return stepLink(task[0], `Next task: ${task[1]}`, ARROW_RIGHT);
  if (week.after) return stepLink(week.after[0], `Next: ${week.after[1]}`, ARROW_RIGHT);
  return `<span class="step" aria-disabled="true">${ARROW_RIGHT}</span>`;
}

class DrawerTab extends HTMLElement {
  connectedCallback() {
    const place = currentPlace();
    if (!place) return;
    const { week, index, folder, file } = place;
    rememberVisit(folder, file);
    const [, title, swatch] = week.tasks[index];
    const total = week.tasks.length;

    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>${BASE_CSS}${THEMES[week.theme] ?? ''} .tab { --swatch: ${swatch}; }</style>
      <nav class="tab" aria-label="${week.label} tasks">
        ${prevLink(week, index)}
        <a class="hub" href="${week.hub ?? 'index.html'}" aria-label="${week.label}, task ${index + 1} of ${total}: ${title}. Back to all tasks">
          <span class="text">
            <span class="where">${week.label} · ${index + 1}/${total}</span>
            <span class="what">${title}</span>
          </span>
        </a>
        ${nextLink(week, index)}
      </nav>`;

    this.watchScroll();
  }

  // Tuck the tab away on scroll down, bring it back on scroll up, when
  // scrolling stops, or at the very bottom of the page.
  watchScroll() {
    let lastY = window.scrollY;
    let idle;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 4;
      this.toggleAttribute('data-tucked', y > lastY && y > 80 && !atBottom);
      lastY = y;
      clearTimeout(idle);
      idle = setTimeout(() => this.removeAttribute('data-tucked'), 900);
    }, { passive: true });
  }
}

if (!customElements.get('drawer-tab')) {
  customElements.define('drawer-tab', DrawerTab);
  // Fonts must be declared on the document for the shadow root to use them.
  const fonts = document.createElement('style');
  fonts.textContent = FONT_FACES;
  document.head.append(fonts);
  document.body.append(document.createElement('drawer-tab'));
}
