import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const rawApiUrl = env.VITE_API_URL || env.VITE_API_BASE_URL || 'https://rongon-backend.vercel.app'
  const targetHost = rawApiUrl.replace(/\/api\/?$/, '') || 'https://rongon-backend.vercel.app'

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: targetHost,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  }
})
