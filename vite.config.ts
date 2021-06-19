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
        target: 'http://main.back-end.hackathon21_spring_02.trap.show/api', // TODO: cname で書き換える
        // process.env.NODE_ENV === 'production'
        //   ? 'https://main.back-end.hackathon21_spring_02.trap.show/' // TODO: cname で書き換える
        //   : 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  base: '/',
  plugins: [vue()],
})
