import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import StyleClass from 'primevue/styleclass';
import KeyFilter from 'primevue/keyfilter';
import es from './locale.es';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('tooltip', Tooltip);
    nuxtApp.vueApp.directive('styleclass', StyleClass);
    nuxtApp.vueApp.directive('keyfilter', KeyFilter);
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.use(ConfirmationService);
    nuxtApp.vueApp.use(DialogService);

    nuxtApp.vueApp.use(PrimeVue, {
        // unstyled: true,
        locale: es,
        ripple: true,
        theme: {
            ripple: true,
            options: {
                ripple: true,
                cssLayer: {
                    name: 'primeui',
                    order: 'tailwind-base, primevue, tailwind-utilities '
                },
                darkModeSelector: '.app-dark'
            }
        }
    });
});
