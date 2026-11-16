import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const appPage = (name) => fileURLToPath(new URL(`./app/${name}.html`, import.meta.url));

export default defineConfig(({ command }) => ({
  root: 'app',
  base: command === 'build' ? '/web-programming/week11/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: appPage('index'),
        coursework: appPage('coursework'),
        directory: appPage('directory'),
        products: appPage('products'),
        courses: appPage('courses'),
        practice: appPage('practice'),
        gallery: appPage('gallery'),
        examples: appPage('examples'),
      },
    },
  },
}));
