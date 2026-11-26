import { describeWeather } from './weatherCodes.js';
import { formatClock, formatLongDate, formatTemperature } from './format.js';
import { WeatherIcon } from './WeatherIcon.jsx';

// An arched window onto the place's sky. The glass is painted with the same sky as the
// page, and the reading sits on the lower pane. The sill holds the smaller facts.
export function WeatherWindow({ place, weather, sky }) {
  const isSuccess = weather.status === 'success';

  return (
    <article className="window-wrap" aria-labelledby="window-place" aria-busy={weather.status === 'loading'}>
      <div className="window">
        <div className="pane" data-sky={isSuccess || weather.status === 'loading' ? sky : 'cloud'}>
          <div className="pane__weather" aria-hidden="true" />
          {isSuccess && <PaneMark current={weather.data.current} />}
          <div className="pane__reading">
            <p className="pane__place" id="window-place">
              {place.name}
              {place.detail && <span className="pane__detail">{place.detail}</span>}
            </p>
            <Reading weather={weather} />
          </div>
        </div>
      </div>
      <div className="sill" aria-hidden="true" />
      {isSuccess && <SillNote data={weather.data} />}
    </article>
  );
}

function PaneMark({ current }) {
  const { icon } = describeWeather(current.weather_code);
  return <WeatherIcon kind={icon} isNight={current.is_day === 0} className="pane__mark" />;
}

function Reading({ weather }) {
  if (weather.status === 'loading') {
    return (
      <div className="pane__state" role="status">
        <span className="spinner" aria-hidden="true" />
        <p>checking the sky…</p>
      </div>
    );
  }

  if (weather.status === 'error') {
    const { kind, message } = weather.error;
    return (
      <div className="pane__state" role="alert">
        <p className="pane__error-title">{ERROR_TITLES[kind] ?? ERROR_TITLES.server}</p>
        <p>{message}</p>
        {/* Retrying bad coordinates would fail the same way, so only offer it when it can help. */}
        {kind !== 'bad-coords' && (
          <button type="button" className="btn btn--solid" onClick={weather.retry}>
            Try again
          </button>
        )}
      </div>
    );
  }

  const { current, daily } = weather.data;
  return (
    <>
      <p className="pane__date">
        {formatLongDate(daily.time[0])} · as of {formatClock(current.time)}
      </p>
      <p className="pane__temp">{formatTemperature(current.temperature_2m)}</p>
      <p className="pane__desc">{describeWeather(current.weather_code).label}</p>
      <p className="pane__wind">wind {current.wind_speed_10m.toFixed(1)} km/h</p>
    </>
  );
}

function SillNote({ data }) {
  const { current, daily } = data;
  return (
    <dl className="sill-note">
      <div>
        <dt>feels like</dt>
        <dd>{formatTemperature(current.apparent_temperature)}</dd>
      </div>
      <div>
        <dt>humidity</dt>
        <dd>{current.relative_humidity_2m}%</dd>
      </div>
      <div>
        <dt>today</dt>
        <dd>
          {Math.round(daily.temperature_2m_max[0])}° / {Math.round(daily.temperature_2m_min[0])}°
        </dd>
      </div>
    </dl>
  );
}

const ERROR_TITLES = {
  network: 'the line went quiet',
  'rate-limit': 'too many questions at once',
  'bad-coords': "that place isn't on any map",
  'bad-response': 'the answer came back garbled',
  server: 'the sky service is down',
};
