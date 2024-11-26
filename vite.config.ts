import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nightwatchPlugin from 'vite-plugin-nightwatch'

// const { VITE_NAVER_API_URL } = import.meta.env
// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: './mkcert/key.pem',
      cert: './mkcert/cert.pem',
    },
    proxy: {
      '/naver-api': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/naver-api/, ''),
      },

      '/tmap-api': {
        target: 'https://apis.openapi.sk.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tmap-api/, ''),
      },
    },
  },
  plugins: [vue(), vueJsx(), nightwatchPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
