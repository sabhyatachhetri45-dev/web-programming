import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/web-programming/week13/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: 'fri.html',
    },
  },
}));
