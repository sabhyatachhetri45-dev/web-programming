import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectGallery from '../ProjectGallery.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectGallery />
  </React.StrictMode>
);
