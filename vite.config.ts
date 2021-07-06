import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': srcPath,
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  base: '/',
  plugins: [vue()],
})
