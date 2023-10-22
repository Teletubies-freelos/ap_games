import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    rollupOptions:{
      manualChunks:{
        react: ["react", "react-dom"],
        material: ["@mui/material", "@emotion/styled"],
        form: ["react-hook-form"],
        router: ["react-router-dom"],
        reactQuery: ["@tanstack/react-query"]
      }
    }
  },
  server: {
    port: Number(process.env.PORT ?? 5001)
  },
  base: './'
})
