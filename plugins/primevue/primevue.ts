import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import StyleClass from 'primevue/styleclass';
import es from './locale.es';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('tooltip', Tooltip);
    nuxtApp.vueApp.directive('styleclass', StyleClass);
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.use(ConfirmationService);

    nuxtApp.vueApp.use(PrimeVue, {
        locale: es,
        theme: {
            options: {
                cssLayer: {
                    name: 'primeui',
                    order: 'tailwind-base, primevue, tailwind-utilities '
                },
                darkModeSelector: '.app-dark'
            }
        }
    });
});
