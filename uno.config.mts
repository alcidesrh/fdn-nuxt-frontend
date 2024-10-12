import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    // presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
    type Rule
} from 'unocss';

import { utopiarules } from './utils/unocss_rules';

export default defineConfig({
    rules: [...(utopiarules as Rule<object>[])],
    shortcuts: [],
    content: {
        pipeline: {
            include: [
                // the default
                /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
                // include js/ts files
                'composables/**/*.{ts,js,vue}'
            ]
            // exclude files
            // exclude: []
        },
        filesystem: [
            // 'layers/**/*.{js,ts.vue}',
            'layers/auth/components/form/*.{ts,js,vue}',
            'composables/**/*.{ts,js,vue}',
            './node_modules/@primevue/**/*.{vue,js,ts,jsx,tsx}'
        ]
    },
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2
        })
        // presetTypography(),
        // presetWebFonts({
        //   fonts: {
        //     sans: 'DM Sans',
        //     serif: 'DM Serif Display',
        //     mono: 'DM Mono',
        //   },
        // }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()]
});
