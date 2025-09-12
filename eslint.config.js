// import withNuxt from './.nuxt/eslint.config.mjs'
import antfu from '@antfu/eslint-config'

export default antfu({
  /**
   * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
   * By default uses Prettier
   */
  css: true,
  /**
   * Format HTML files
   * By default uses Prettier
   */
  html: true,
  unocss: true,
})
// export default withNuxt(
// your custom flat configs go here, for example:
// {
//   files: ['**/*.ts', '**/*.tsx'],
//   rules: {
//     'no-console': 'off' // allow console.log in TypeScript files
//   }
// },
// {
//   ...
// }
// )
