import { pwa } from './config/pwa'
import { fileURLToPath } from 'url'
import Components from 'unplugin-vue-components-primevue/vite'
import { PrimeVueResolver } from 'unplugin-vue-components-primevue/resolvers'

export default defineNuxtConfig({
  ssr: false,
  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@pinia/nuxt', '@vite-pwa/nuxt', 'nuxt-module-eslint-config', '@formkit/nuxt', '@hypernym/nuxt-gsap', '@pinia-plugin-persistedstate/nuxt', 'nuxt-icon'],
  piniaPersistedstate: {
    storage: 'localStorage',
  },

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
    // configFile: './formkit.config.ts',
  },
  extends: ['./layers/auth', './layers/api'],
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },
  css: ['@/assets/styles.scss'],

  // pwa,

  devtools: {
    enabled: true,
  },

  features: {
    inlineStyles: false,
  },
  eslintConfig: {
    setup: false,
  },
})
