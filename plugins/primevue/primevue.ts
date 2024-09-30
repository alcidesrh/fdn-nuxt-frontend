import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import StyleClass from 'primevue/styleclass';
import { definePreset } from '@primevue/themes';
import es from './locale.es';
// import preset from '@primevue/themes/aura/';
// import custom from './preset';
// import custom from './aura';

// const Preset = definePreset(preset, custom);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('tooltip', Tooltip);
    nuxtApp.vueApp.directive('styleclass', StyleClass);
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.use(ConfirmationService);

    nuxtApp.vueApp.use(PrimeVue, {
        locale: es,
        theme: {
            // preset: Preset,
            options: {
                cssLayer: {
                    name: 'primeui',
                    // order: 'reset, primeui'
                    order: 'tailwind-base, primevue, tailwind-utilities '
                },
                darkModeSelector: '.app-dark'
            }
        }
    });
});
