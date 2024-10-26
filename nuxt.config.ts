// https://nuxt.com/docs/api/configuration/nuxt-config
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import Components from 'unplugin-vue-components/vite';
import { icons } from './constants';
import { createResolver } from '@nuxt/kit';

export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt',
        // '@nuxt/eslint',
        // '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@unocss/nuxt',
        '@nuxt/icon',
        '@formkit/nuxt'
    ],
    imports: {
        presets: [
            {
                from: '@vue/apollo-composable',
                imports: ['useQuery']
            }
        ]
    },

    icon: {
        clientBundle: {
            // list of icons to include in the client bundle
            icons: icons,
            // include all custom collections in the client bundle
            includeCustomCollections: true
        },
        provider: 'server',
        localApiEndpoint: '/api_icon/_nuxt_icon',
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
    ssr: false,
    // pages: true,
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        }
    },
    hooks: {
        'pages:routerOptions'({ files }) {
            const resolver = createResolver(import.meta.url);
            // add a route
            files.push({
                path: resolver.resolve('./router.options'),
                optional: true
            });
        }
    }
});
