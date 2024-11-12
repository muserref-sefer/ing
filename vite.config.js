// vite.config.js
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: path.resolve(__dirname, '.'), 
  build: {
    outDir: path.resolve(__dirname, 'dist'), 
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
});
