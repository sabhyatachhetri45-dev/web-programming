import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this folder from /web-programming/week12/, so asset URLs need that prefix in the build.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/web-programming/week12/' : '/',
  plugins: [react()],
}));
