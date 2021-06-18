import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://main.back-end.hackathon21_spring_02.trap.show/', // TODO: cname で書き換える
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [vue()],
})
