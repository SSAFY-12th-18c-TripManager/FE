import './assets/main.css'
import vuetify from './plugins/vuetify.ts'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { AVPlugin } from 'vue-audio-visual'

const app = createApp(App)
app.use(createPinia()).use(router).use(vuetify).use(AVPlugin)

app.mount('#app')
