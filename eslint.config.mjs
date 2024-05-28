import withNuxt from './.nuxt/eslint.config.mjs'
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import unocss from '@unocss/eslint-config/flat'
export default withNuxt()
// [{ languageOptions: { globals: globals.browser } }, pluginJs.configs.recommended, ...tseslint.configs.recommended, ...pluginVue.configs['flat/essential'], unocss]
// your custom flat configs go here, for example:

// },
// {
//   ...
// }
