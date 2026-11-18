import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProjectGallery } from '../gallery/ProjectGallery.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectGallery />
  </StrictMode>
);
