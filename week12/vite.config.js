import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Existing class 1 and Weather Dashboard pages share the Week 12 Vite project.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/web-programming/week12/' : '/',
  plugins: [react()],
  server: {
    // The weather page imports the portfolio's shared diary styles from ../assets.
    fs: { allow: ['..'] },
  },
  build: {
    // The Study Guide and Sprint Quiz are embedded in the Weather Dashboard page.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        weather: resolve(import.meta.dirname, 'weather/index.html'),
      },
    },
  },
}));
