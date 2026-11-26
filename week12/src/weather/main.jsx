import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The portfolio's shared fonts and resets, so this page sits in the same diary as every other week.
import '../../../assets/drawer/base.css';
import './weather.css';
import { WeatherDashboard } from './WeatherDashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherDashboard />
  </StrictMode>
);
