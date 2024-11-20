import { createVuetify } from 'vuetify'
import '@/styles/main.scss'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          primary: '#aaaaaa', // 기본 버튼 색상 (오렌지색)
        },
      },
    },
  },
})

export default vuetify
