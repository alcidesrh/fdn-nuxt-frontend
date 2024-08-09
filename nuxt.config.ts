// import { pwa } from './config/pwa'
import { fileURLToPath } from 'url'
import Components from 'unplugin-vue-components-primevue/vite'
import { PrimeVueResolver } from 'unplugin-vue-components-primevue/resolvers'

export default defineNuxtConfig({
  ssr: false,
  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@pinia/nuxt', '@formkit/nuxt', '@hypernym/nuxt-gsap', '@pinia-plugin-persistedstate/nuxt', 'nuxt-icon', '@nuxt/eslint'], //'@vite-pwa/nuxt'
  piniaPersistedstate: {
    storage: 'localStorage',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },

  plugins: ['~/plugins/primevue/primevue.ts'],
  vite: {
    plugins: [
      Components({
        resolvers: [PrimeVueResolver()],
      }),
    ],
  },

  gsap: {
    composables: true,
    provide: false,
  },

  alias: {
    schema: fileURLToPath(new URL('./components/form/schemas', import.meta.url)),
    nm: fileURLToPath(new URL('./node_modules', import.meta.url)),
  },

  formkit: {
    // autoImport: true,
    // defaultConfig: false,
  },
  extends: ['./layers/auth'],
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },
  css: ['@/assets/styles.css'],

  // pwa,

  devtools: {
    enabled: false,
  },

  features: {
    inlineStyles: false,
  },
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    // layoutTransition: { name: 'layout', mode: 'out-in' },
  },
})
