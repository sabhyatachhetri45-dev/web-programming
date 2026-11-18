// Small stroke icons drawn on a 24px grid. Kept in one place so every icon shares weight and caps.
const PATHS = {
  bag: 'M6 8h12l-1 12H7L6 8Zm3 0V7a3 3 0 0 1 6 0v1',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'M5 12.5 10 17 19 7',
  truck: 'M3 6h11v10H3zM14 10h4l3 3v3h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  arrowLeft: 'M19 12H5m6-6-6 6 6 6',
  box: 'M4 8l8-4 8 4v8l-8 4-8-4V8Zm0 0 8 4 8-4M12 12v8',
  leaf: 'M5 19c0-8 5-14 14-14 0 9-6 14-14 14Zm0 0 7-7',
  returnArrow: 'M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',
  moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z',
};

export function Icon({ name, className = 'icon' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
