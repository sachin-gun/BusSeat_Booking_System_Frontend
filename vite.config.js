import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT as unknown as number,
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  base: '/', // Keep this for default routing
})
