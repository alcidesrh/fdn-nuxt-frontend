// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
// require('@rushstack/eslint-patch/modern-module-resolution');
export default withNuxt({
    files: ['**/*.ts', '**/*.vue'],
    rules: {
        'no-console': 'off' // allow console.log in TypeScript files

        // 'vue/multi-word-component-names': 'off',
        // 'vue/no-reserved-component-names': 'off',
        // 'vue/component-tags-order': [
        //     'error',
        //     {
        //         order: ['script', 'template', 'style']
        //     }
        // ]
    }
});
