import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The three assignment pages share one Vite project and remain separate entry points.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/web-programming/week12/' : '/',
  plugins: [react()],
  server: {
    // The weather page imports the portfolio's shared diary styles from ../assets.
    fs: { allow: ['..'] },
  },
  build: {
    // Class 1, the existing weather dashboard, and the new Week 12.2 study guide.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        weather: resolve(import.meta.dirname, 'weather/index.html'),
        studyGuide: resolve(import.meta.dirname, 'week12.2/index.html'),
      },
    },
  },
}));
