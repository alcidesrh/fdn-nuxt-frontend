import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '~/assets/theme/aura'
// import Aura from 'primevue/themes/aura'
// import { definePreset } from 'primevue/themes'

// const preset = definePreset(Aura, {})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        // cssLayer: true,
      },
    },
    // importTheme: { from: '@plugins/primevue.ts' },
    // cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
  })
})
