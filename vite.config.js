import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Базовый путь для Vercel
  build: {
    outDir: 'dist', // Папка для сборки
  },
});
