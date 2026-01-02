import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Forces single copy of React to prevent crashes
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled'),
    },
  },
  server: {
    host: true,
    port: 5174, // Mentor app usually runs on a different port (often 5174 or 3001)
    allowedHosts: [
      "mentor-4be.ptascloud.online",
      "localhost"
    ],
    hmr: {
      clientPort: 443 // Fixes the "Loading failed" error on Cloudflare
    }
  }
})
