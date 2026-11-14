import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  root: 'app',
  base: command === 'build' ? '/web-programming/week11/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
}));
