import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this folder from /web-programming/week12/, so asset URLs need that prefix in the build.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/web-programming/week12/' : '/',
  plugins: [react()],
  server: {
    // The weather page imports the portfolio's shared diary styles from ../assets.
    fs: { allow: ['..'] },
  },
  build: {
    // Two pages: class 1 (shopping cart) at week12/ and class 2 (weather) at week12/weather/.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        weather: resolve(import.meta.dirname, 'weather/index.html'),
      },
    },
  },
}));
