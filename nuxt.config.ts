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
    css: ['/assets/tailwind.css', '@/assets/styles.css'],
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
        },

        head: {
            viewport: 'width=device-width,initial-scale=1',
            link: [
                { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
                { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: '' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
                { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
                { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' }
            ]
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
