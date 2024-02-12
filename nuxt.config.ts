import { pwa } from './config/pwa'
import { appDescription } from './constants/index'
import { components } from './components/primevue/components'
import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-module-eslint-config',
    'nuxt-primevue',
    '@formkit/nuxt',
    '@hypernym/nuxt-gsap'
  ],
  imports: {
    dirs: [
      'types'
    ]
  },
  gsap: {
    composables: true,
    provide: false,
  },
  alias: {
    'schema': fileURLToPath(new URL('./components/form/schemas', import.meta.url)),
    'fdn': fileURLToPath(new URL('./types', import.meta.url)),
  },
  primevue: {
    usePrimeVue: true,
    options: { ripple: true },
    components: {
      include: components,
    },
  },
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true
  },
  // extends: [
  //   'auth',
  // ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    // '@unocss/reset/tailwind.css',
    'primevue/resources/primevue.min.css',
    '@/assets/styles.scss',
  ],

  // nitro: {
  //   esbuild: {
  //     options: {
  //       target: 'esnext',
  //     },
  //   },
  //   prerender: {
  //     crawlLinks: false,
  //     routes: ['/'],
  //     ignore: ['/hi'],
  //   },
  // },

  // app: {
  //   head: {
  //     viewport: 'width=device-width,initial-scale=1',
  //     link: [
  //       { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
  //       { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
  //       { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  //     ],
  //     meta: [
  //       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //       { name: 'description', content: appDescription },
  //       { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  //     ],
  //   },
  // },

  pwa,

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslintConfig: {
    setup: false,
  },
})
