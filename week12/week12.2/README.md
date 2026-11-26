# Week 12.2 — React Effects Study Guide

A third page in the existing Week 12 Vite/React project. It adds only the requested Study Guide exercises and Sprint Quiz. The Week 12 shopping cart and Weather Dashboard remain separate and unchanged.

## Run locally

From the repository root:

```bash
cd week12
npm install
npm run dev
```

Open the local Vite URL and go to `/week12.2/` (for example, `http://localhost:5173/week12.2/`). Build all Week 12 pages with `npm run build`.

## What is included

- **Study Guide:** Document Title Sync, Fetch User, and Stopwatch, each in its own component.
- **Sprint Quiz:** 12 multiple-choice useEffect questions with one answer per question, instant explanations, score summary, and restart.
- **Responsive interface:** Study Guide and Sprint Quiz navigation tabs, small-screen layout, keyboard focus styles, and reduced-motion support.

## How the hooks work

- **Document Title Sync:** `useEffect` depends on `[title]`, so the browser tab title follows the input. Its cleanup restores `WebPro` when the exercise unmounts.
- **Fetch User:** An empty dependency array `[]` runs the request on mount. `AbortController` cancels it on unmount; loading, HTTP/network errors, and the user details are shown in the UI.
- **Stopwatch:** `useState` stores elapsed milliseconds and running status. The effect depends on `[isRunning]`, opens one 10 ms interval while running, and calls `clearInterval` in cleanup. Elapsed time is calculated from a monotonic clock so interval delays do not accumulate as timer drift.
- **Sprint Quiz:** The selected option is stored for the current question and locks the choices. The score increases once only for a correct choice. The final score is correct answers out of 12; Restart resets the question, selection, and score.

## Test checklist

- [ ] Switch between the Study Guide and Sprint Quiz tabs.
- [ ] Type in the title exercise; check the browser tab and on-page title message. Switch away and verify the tab title becomes `WebPro`.
- [ ] Load Fetch User and check name, username, email, phone, website, and company. Check loading and error feedback with a network interruption.
- [ ] Start, stop, resume, and reset the stopwatch. Confirm Start cannot create duplicate intervals.
- [ ] Answer all 12 quiz questions. Verify immediate correct/incorrect feedback and explanations, and confirm a question cannot be answered twice.
- [ ] Verify the final score, restart the quiz, and check the score returns to zero.
- [ ] Resize to mobile and desktop widths; test keyboard focus and reduced-motion settings.
