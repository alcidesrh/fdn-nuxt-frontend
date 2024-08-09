import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'
import StyleClass from 'primevue/styleclass'
import { definePreset } from '@primevue/themes'
// import preset from '@primevue/themes/aura/'
// import custom from './aura'
// import preset from '@primevue/themes/lara/'
// import custom from './lara'
// import preset from '@primevue/themes/nora/'
import preset from '@primevue/themes/nora/'
import custom from './nora'

// const Preset = definePreset(preset, custom)
const Preset = definePreset(preset, custom)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tooltip', Tooltip)
  nuxtApp.vueApp.directive('styleclass', StyleClass)
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Preset,
      options: {
        cssLayer: {
          name: 'primeui',
          order: 'tailwind-compat, primeui',
        },
      },
    },
    // importTheme: { from: '@plugins/primevue.ts' },
    // cssLayerOrder: 'tailwind-compat, preflights, primeui;',
  })
})
