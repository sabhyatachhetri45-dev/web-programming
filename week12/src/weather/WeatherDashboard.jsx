import { useState } from 'react';
import { useWeather } from '../hooks/useWeather.js';
import { ForecastStrip } from './ForecastStrip.jsx';
import { PlacePicker } from './PlacePicker.jsx';
import { skyFor } from './skies.js';
import { describeWeather } from './weatherCodes.js';
import { WeatherIcon } from './WeatherIcon.jsx';
import { WeatherWindow } from './WeatherWindow.jsx';

// Same opening place as the homework's target widget.
const SEOUL = { name: 'Seoul', detail: 'Seoul, South Korea', latitude: 37.566, longitude: 126.9784 };

const NOTES = [
  {
    title: 'useEffect fetches',
    copy: 'useWeather runs its effect whenever latitude or longitude change, and asks Open-Meteo for the forecast.',
  },
  {
    title: 'cleanup aborts',
    copy: 'If you pick a new place before the answer arrives, the cleanup aborts the old request so it can never overwrite the new one.',
  },
  {
    title: 'every state shown',
    copy: 'Loading, network down, rate limit (429) and bad coordinates (400) each get their own message in the window.',
  },
];

export function WeatherDashboard() {
  // The only real state: which place we're looking at. Everything else is fetched or derived.
  const [place, setPlace] = useState(SEOUL);
  const weather = useWeather(place.latitude, place.longitude);
  const shown = weather.status === 'success' ? weather.data : weather.previous;
  const sky = skyOf(shown);

  return (
    // The whole page is painted with the sky Open-Meteo reports for this place.
    <div className="sky-page" data-sky={sky}>
      {/* Keyed by sky so the rain, snow or stars fade in again when the weather changes. */}
      <div key={sky} className="sky-page__weather pane__weather" aria-hidden="true" />
      <main className="page">
        <header className="intro">
          <a className="back-to-diary" href="../../index.html#weekly">
            <span aria-hidden="true">←</span> back to the diary
          </a>
          <h1>
            Week 12, Class 2{' '}
            <span className="day" aria-hidden="true">
              <WeatherIcon
                kind={shown ? describeWeather(shown.current.weather_code).icon : 'cloudy'}
                isNight={shown?.current.is_day === 0}
                className="day__icon"
              />
            </span>
          </h1>
          <p className="intro__topic">
            This class's topic is <strong>useEffect and fetching data</strong>: asking the free Open-Meteo API for the
            weather whenever the place changes, and showing what happens while it loads or fails.
          </p>
          <p className="intro__note">it rained all week, so I built a window to watch the sky.</p>
        </header>

        <div className="desk">
          <PlacePicker onPick={setPlace} />
          <WeatherWindow place={place} weather={weather} sky={sky} />
        </div>

        {weather.status === 'success' && <ForecastStrip daily={weather.data.daily} />}

        <section className="notes" aria-labelledby="notes-title">
          <h2 id="notes-title">how this page works</h2>
          <ol className="notes__list">
            {NOTES.map((note) => (
              <li key={note.title} className="note">
                <p className="note__title">{note.title}</p>
                <p>{note.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <nav className="page-turn" aria-label="Week 12 pages">
          <a href="../">
            <span aria-hidden="true">←&nbsp;</span>Class 1's stationery shop
          </a>
          <a href="../../index.html#weekly">
            back to the diary<span aria-hidden="true">&nbsp;→</span>
          </a>
        </nav>

        <p className="credit">
          Weather data by{' '}
          <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">
            Open-Meteo.com
          </a>{' '}
          (CC BY 4.0).
        </p>
      </main>
    </div>
  );
}

// While the next place loads, `shown` is the last forecast, so the sky doesn't flash back to the default.
function skyOf(data) {
  if (!data) return 'night';
  return skyFor(data.current.weather_code, data.current.is_day === 1);
}
