// https://nuxt.com/docs/api/configuration/nuxt-config
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import Components from 'unplugin-vue-components/vite';
import { icons } from './constants';
import { createResolver } from '@nuxt/kit';

export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt', // '@nuxt/eslint',
        // '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        // '@pinia-plugin-persistedstate/nuxt',
        '@unocss/nuxt',
        '@nuxt/icon',
        '@formkit/nuxt',
        'dayjs-nuxt'
    ],
    components: {
        dirs: [{ global: true, path: '~/form/inputs/components' }, '~/components/global', '~/components']
    },
    imports: {
        presets: [
            {
                from: '@vue/apollo-composable',
                imports: ['useQuery']
            }
        ]
    },
    dayjs: {
        locales: ['es'],
        plugins: ['relativeTime', 'utc', 'timezone'],
        defaultLocale: 'es',
        defaultTimezone: 'America/Guatemala'
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

    piniaPluginPersistedstate: {
        // cookieOptions: {
        //     sameSite: 'strict'
        // },
        // storage: 'cookies'

        storage: 'localStorage'
    },

    vite: {
        optimizeDeps: {
            include: ['daysjs']
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
    devtools: {
        enabled: false,

        timeline: {
            enabled: false
        }
    },
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
                // { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
                // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Faster+One&display=swap' }
            ],
            meta: [
                { name: 'viewport', content: 'height=device-height, width=device-width, initial-scale=1.0,   minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi' },
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
