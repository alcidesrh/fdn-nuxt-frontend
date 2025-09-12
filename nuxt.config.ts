import { createResolver } from '@nuxt/kit'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  eslint: {
    config: {
      stylistic: true, // <---
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@unocss/nuxt',
    '@nuxt/icon',
    '@formkit/nuxt',
    'dayjs-nuxt',
    '@nuxt/fonts',
    '@nuxt/eslint',
  ],
  components: {
    dirs: [
      { global: true, path: '~/form/inputs/components' },
      '~/components/global',
      '~/components',
    ],
  },
  plugins: ['~/plugins/primevue/primevue.ts'],
  css: ['@/assets/styles.css'],
  pinia: {
    storesDirs: ['app/stores/**'],
  },

  piniaPluginPersistedstate: {
    storage: 'localStorage',
  },
  // typescript: {
  //   strict: false,
  // },
  imports: {
    presets: [
      // {
      //     from: '@vue/apollo-composable',
      //     imports: ['useQuery']
      // },
      {
        from: '@formkit/vue',
        imports: ['FormKitMessages'],
      },
    ],
  },
  vite: {
    plugins: [
      Components({
        resolvers: [PrimeVueResolver()],
      }),
      tailwindcss(),
    ],
  },
  pages: true,
  hooks: {
    'pages:routerOptions': function ({ files }) {
      const resolver = createResolver(import.meta.url)
      // add a route
      files.push({
        path: '~/graphql/router.options.ts', // resolver.resolve("~/router.options.ts"),
        // optional: true
      })
    },
    'pages:extend': function (pages) {
      function setMiddleware(pages) {
        for (const page of pages) {
          if (!['Login', 'Test'].includes(page.name)) {
            page.meta ||= {}
            // Note that this will override any middleware set in `definePageMeta` in the page
            page.meta.auth = true
          }

          if (page.children)
            setMiddleware(page.children)
        }
      }
      setMiddleware(pages)

      // add a route
      // pages.push({
      //     path: resolver.resolve('./router.options'),
      //     optional: true
      // });
      // remove routes
      // function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
      //     const pagesToRemove: NuxtPage[] = [];
      //     for (const page of pages) {
      //         if (page.file && pattern.test(page.file)) {
      //             pagesToRemove.push(page);
      //         } else {
      //             removePagesMatching(pattern, page.children);
      //         }
      //     }
      //     for (const page of pagesToRemove) {
      //         pages.splice(pages.indexOf(page), 1);
      //     }
      // }
      // removePagesMatching(/\.ts$/, pages);
    },
  },
})
