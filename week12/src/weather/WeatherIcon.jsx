// Hand-drawn-feeling weather marks on a 32px grid, one per group in weatherCodes.js.
const SUN = <circle cx="16" cy="16" r="6" />;
const RAYS = (
  <path d="M16 3v3M16 26v3M3 16h3M26 16h3M6.8 6.8l2.1 2.1M23.1 23.1l2.1 2.1M6.8 25.2l2.1-2.1M23.1 8.9l2.1-2.1" />
);
const MOON = <path d="M22 20.5A8.5 8.5 0 0 1 11.5 10 8.5 8.5 0 1 0 22 20.5Z" />;
const CLOUD = <path d="M10 25h13a5 5 0 0 0 .6-10A7 7 0 0 0 10.2 17 4 4 0 0 0 10 25Z" />;
const SMALL_CLOUD = <path d="M13 26h11a4.2 4.2 0 0 0 .5-8.4 6 6 0 0 0-11.4 1.6A3.4 3.4 0 0 0 13 26Z" />;

const DRAWINGS = {
  clear: (
    <>
      {SUN}
      {RAYS}
    </>
  ),
  partly: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 3v2M3 12h2M5.6 5.6l1.4 1.4M18.4 5.6 17 7" />
      {SMALL_CLOUD}
    </>
  ),
  cloudy: CLOUD,
  fog: <path d="M5 12h22M8 17h18M5 22h20M10 27h14" />,
  drizzle: (
    <>
      <path d="M10 20h13a5 5 0 0 0 .6-10A7 7 0 0 0 10.2 12 4 4 0 0 0 10 20Z" />
      <path d="M12 24v1.5M17 24v1.5M22 24v1.5" />
    </>
  ),
  rain: (
    <>
      <path d="M10 20h13a5 5 0 0 0 .6-10A7 7 0 0 0 10.2 12 4 4 0 0 0 10 20Z" />
      <path d="M12 23l-1.5 4M17 23l-1.5 4M22 23l-1.5 4" />
    </>
  ),
  snow: (
    <>
      <path d="M10 20h13a5 5 0 0 0 .6-10A7 7 0 0 0 10.2 12 4 4 0 0 0 10 20Z" />
      <path d="M12 24.5h.01M17 26.5h.01M22 24.5h.01" />
    </>
  ),
  storm: (
    <>
      <path d="M10 20h13a5 5 0 0 0 .6-10A7 7 0 0 0 10.2 12 4 4 0 0 0 10 20Z" />
      <path d="m17 21-3 5h4l-2 4" />
    </>
  ),
};

export function WeatherIcon({ kind, isNight = false, className = 'weather-icon' }) {
  // A clear night sky gets the moon instead of the sun.
  const drawing = kind === 'clear' && isNight ? MOON : DRAWINGS[kind] ?? CLOUD;
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {drawing}
    </svg>
  );
}
