import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      manualChunks: {
        react: ['react', 'react-dom'],
        material: ['@mui/material', '@emotion/styled', '@emotion/react'],
        router: ['react-router-dom'],
        reactQuery: ['@tanstack/react-query'],
      },
    },
  },
});
