import './assets/main.css'
import vuetify from './plugins/vuetify.ts'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { AVPlugin } from 'vue-audio-visual'
import { useKakao } from 'vue3-kakao-maps/@utils'
const { VITE_KAKAO_MAP_SERVICE_KEY } = import.meta.env
const app = createApp(App)
app.use(createPinia()).use(router).use(vuetify).use(AVPlugin)
useKakao(VITE_KAKAO_MAP_SERVICE_KEY)
app.mount('#app')
