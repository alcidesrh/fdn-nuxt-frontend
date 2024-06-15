import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primevue/themes/aura/'
import StyleClass from 'primevue/styleclass'
import { definePreset } from '@primevue/themes'
import CustomAura from './aura'

const Preset = definePreset(Aura, CustomAura)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('styleclass', StyleClass)
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Preset,
      options: {
        // cssLayer: true,
      },
    },
    // importTheme: { from: '@plugins/primevue.ts' },
    // cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
  })
})
