import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '~/assets/theme/aura'
// import Aura from 'primevue/themes/aura'
import { definePreset } from 'primevue/themes'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
  },
  components: {},
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: MyPreset,
      options: {
        darkModeSelector: '.my-app-dark',
      },
    },
    // importTheme: { from: '@plugins/primevue.ts' },
    // cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
  })
})
