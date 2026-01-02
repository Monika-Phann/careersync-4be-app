import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Fixes the "Two Reacts" crash
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled'),
    },
  },
  server: {
    host: true, 
    port: 3000,
    allowedHosts: ["careersync-4be.ptascloud.online"],
    // Fixes the "Loading failed" error on Cloudflare/HTTPS
    hmr: {
      clientPort: 443 
    }
  }
})
