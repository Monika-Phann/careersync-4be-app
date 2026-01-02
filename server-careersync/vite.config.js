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
    port: 5173, // Admin usually runs on 5173 (default Vite port)
    allowedHosts: [
      "admin-4be.ptascloud.online",
      "localhost"
    ],
    hmr: {
      clientPort: 443 // Fixes loading errors on Cloudflare
    }
  }
})
