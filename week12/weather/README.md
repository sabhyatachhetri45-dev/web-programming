# Week 12, Class 2 — Weather Dashboard

A React weather dashboard for the Week 12, Class 2 homework. It uses the free Open-Meteo Forecast and Geocoding APIs; no API key or paid service is required.

## Run the project

From the repository root:

```bash
cd week12
npm install
npm run dev
```

Open the Vite URL shown in the terminal and visit `/weather/` (for example, `http://localhost:5173/weather/`). The Week 12 Class 1 project remains at the root URL. To verify a production build, run `npm run build` from `week12`.

## Features

- Search by city name using Open-Meteo geocoding, with matching places to choose from.
- Search with latitude and longitude; values must be numeric and within -90..90 and -180..180.
- Display current temperature, weather description, wind speed, humidity, feels-like temperature, and a seven-day forecast.
- Use the browser's location permission to fetch weather for the current location.
- Show loading, no-results, permission, and network/API error messages.
- Cancel stale requests with `AbortController` and debounce city searches to avoid unnecessary requests.
- Responsive weather-themed layout and accessible labels/status messages.

## How the React hooks work

`useState` keeps the selected place, search text, coordinate form values, and UI status. When a city or coordinate is selected, the dashboard updates the selected place. The coordinate inputs are parsed as complete numbers and range-checked before the place can change.

`useEffect` in the weather hook runs when latitude or longitude changes. It requests a forecast and returns a cleanup function that aborts the previous request. The city-search hook also uses an effect, waits briefly for typing to pause, and cancels its timer/request when the query changes.

## API request flow

1. A city name is sent to `https://geocoding-api.open-meteo.com/v1/search`.
2. The user chooses a result; its latitude and longitude become the selected place. Manual coordinates and browser geolocation provide the same coordinate pair.
3. The weather hook requests `https://api.open-meteo.com/v1/forecast` for the selected coordinates, including current temperature, relative humidity, weather code, and wind speed.
4. Open-Meteo weather codes are translated into readable descriptions and icons for the dashboard.

## Assignment test checklist

- [ ] Search for a known city and select a matching result.
- [ ] Search for an unknown city and confirm the no-results message.
- [ ] Enter valid coordinates and confirm the location's weather loads.
- [ ] Try an empty, non-numeric, partially numeric, or out-of-range coordinate and confirm validation prevents a request.
- [ ] Select another place while a request is loading and confirm the old request is cancelled.
- [ ] Check temperature (°C), description, wind (km/h), and humidity are displayed.
- [ ] Use “Use my location” and allow or deny the browser permission; verify the corresponding result/message.
- [ ] Disconnect from the network and confirm an understandable error is shown.
- [ ] Resize the browser to check the responsive desktop/mobile layout.
