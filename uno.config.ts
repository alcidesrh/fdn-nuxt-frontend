import type { Rule } from 'unocss'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  // presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,

} from 'unocss'

import { utopiarules } from './app/utils/unocss_rules'

export default defineConfig({
  rules: [...(utopiarules as Rule<object>[])],
  shortcuts: [],
  content: {
    pipeline: {
      include: [
        'utils/**/*.{ts,js,vue}',
        'form/formkit.theme.ts',
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'composables/**/*.{ts,js,vue}',
        'stores/**/*.{ts,js,vue}',
        'pages/**/*.{ts,js,vue}',
        'components/**/*.{ts,js,vue}',
        'node_modules/@primevue/**/*.{vue,js,ts,jsx,tsx}',
        'layers/**/*.{js,ts.vue}',
      ],
      // exclude files
      // exclude: []
    },
    filesystem: [
      // 'layers/**/*.{js,ts.vue}',
      // 'layers/auth/components/form/*.{ts,js,vue}',
      // 'composables/**/*.{ts,js,vue}',
      // './pages/**/*.{ts,js,vue}',
      // './node_modules/@primevue/**/*.{vue,js,ts,jsx,tsx}'
    ],
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    // presetTypography(),
    // presetWebFonts({
    //   fonts: {
    //     sans: 'DM Sans',
    //     serif: 'DM Serif Display',
    //     mono: 'DM Mono',
    //   },
    // }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
