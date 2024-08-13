// https://nuxt.com/docs/api/configuration/nuxt-config
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import Components from 'unplugin-vue-components/vite';
import { icons } from './constants';
export default defineNuxtConfig({
    // modules: ['@vueuse/nuxt', '@unocss/nuxt', '@pinia/nuxt', '@formkit/nuxt', '@hypernym/nuxt-gsap', '@pinia-plugin-persistedstate/nuxt', 'nuxt-icon', '@nuxt/eslint'],
    modules: [
        '@vueuse/nuxt',
        '@nuxt/eslint',
        // '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@unocss/nuxt',
        '@nuxt/icon'
    ],
    icon: {
        clientBundle: {
            // list of icons to include in the client bundle
            icons: icons,
            // include all custom collections in the client bundle
            includeCustomCollections: true
        },
        provider: 'server',
        customCollections: [
            {
                prefix: 'fdn',
                dir: './assets/icons'
            }
        ]
    },

    plugins: ['~/plugins/primevue/primevue.ts'],
    css: ['@/assets/tailwind.css', '@/assets/styles.css'],
    pinia: {
        storesDirs: ['./stores/**']
    },

    piniaPersistedstate: {
        storage: 'localStorage'
    },
    unocss: {
        nuxtLayers: true
    },
    vite: {
        optimizeDeps: {
            noDiscovery: true
        },
        plugins: [
            Components({
                resolvers: [PrimeVueResolver()]
            })
        ]
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },

    compatibilityDate: '2024-04-03',
    devtools: { enabled: false },
    ssr: false
});
