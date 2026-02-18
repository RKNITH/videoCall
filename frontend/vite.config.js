import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['telephone.png', 'favicon.ico', 'robots.txt'],
      manifest: {
        name: 'V-Connect Video Call',
        short_name: 'V-Connect',
        description: 'Secure Peer-to-Peer Video Calling App',
        theme_color: '#4f46e5', // Indigo-600
        background_color: '#0f172a', // Slate-900
        display: 'standalone',
        icons: [
          {
            src: 'telephone.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'telephone.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  define: {
    global: 'window',
    'process.env': {},
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
    },
  },
})