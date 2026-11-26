import { describeWeather } from './weatherCodes.js';
import { formatWeekday } from './format.js';
import { skyFor } from './skies.js';
import { WeatherIcon } from './WeatherIcon.jsx';

// A row of small windows, each showing that day's (daytime) sky.
export function ForecastStrip({ daily }) {
  const days = daily.time.map((date, index) => ({
    date,
    conditions: describeWeather(daily.weather_code[index]),
    sky: skyFor(daily.weather_code[index]),
    high: Math.round(daily.temperature_2m_max[index]),
    low: Math.round(daily.temperature_2m_min[index]),
    rain: daily.precipitation_probability_max?.[index],
  }));

  return (
    <section className="week-ahead" aria-labelledby="week-ahead-title">
      <h2 id="week-ahead-title">the week ahead</h2>
      <ol className="days">
        {days.map((day, index) => (
          <li key={day.date} className="day-window">
            <div className="mini-pane" data-sky={day.sky}>
              <div className="pane__weather" aria-hidden="true" />
              <WeatherIcon kind={day.conditions.icon} className="mini-pane__mark" />
            </div>
            <p className="day-window__name">{index === 0 ? 'Today' : formatWeekday(day.date)}</p>
            <p className="visually-hidden">{day.conditions.label}</p>
            <p className="day-window__temps">
              <span>{day.high}°</span>
              <span className="day-window__low">{day.low}°</span>
            </p>
            {typeof day.rain === 'number' && <p className="day-window__rain">rain {day.rain}%</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
