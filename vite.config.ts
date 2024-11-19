import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import nightwatchPlugin from 'vite-plugin-nightwatch'

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: './mkcert/key.pem',
      cert: './mkcert/cert.pem',
    },
  },
  plugins: [vue(), vueJsx(), vueDevTools(), nightwatchPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
