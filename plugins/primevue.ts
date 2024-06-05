import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from 'primevue/themes/aura/'
// import Aura from '~/assets/theme/aura'

import { definePreset } from 'primevue/themes'

const Preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{sky.50}',
      100: '{sky.100}',
      200: '{sky.200}',
      300: '{sky.300}',
      400: '{sky.400}',
      500: '{sky.500}',
      600: '{sky.600}',
      700: '{sky.700}',
      800: '{sky.800}',
      900: '{sky.900}',
      950: '{sky.950}',
    },
  },
  components: {
    card: {
      colorScheme: {
        light: {
          root: {
            borderRadius: '4px',
          },
        },
      },
    },
    tree: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.700}',
            color: '{surface.700}',
          },
        },
      },
    },
  },
})

export default defineNuxtPlugin((nuxtApp) => {
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
