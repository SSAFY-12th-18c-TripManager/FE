import { createVuetify } from 'vuetify'
import '@/styles/main.scss'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Specify mdi as the default set
  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          color1: '#15222a',
          color2: '#255a62',
          color3: '#0390e8',
          color4: '#48b4a5',
          color5: '#f4f1ea',
        },
      },
    },
  },
})

export default vuetify
