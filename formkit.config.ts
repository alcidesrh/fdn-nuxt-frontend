import { createAutoAnimatePlugin } from '@formkit/addons';
import { defineFormKitConfig } from '@formkit/vue';
// import { genesisIcons } from '@formkit/icons'
import { es } from '@formkit/i18n';
import { rootClasses } from './form/formkit.theme';
import * as inputs from './form/inputs';
import { generateClasses } from '@formkit/themes';

export default defineFormKitConfig({
    locale: 'es',
    locales: { es },
    // icons: { ...genesisIcons },
    config: {
        rootClasses,
        classes: generateClasses({
            global: {
                label: 'whitespace-nowrap'
            }
            // text: simpleInputClasses,
            // number: simpleInputClasses,
            // password: simpleInputClasses,
        })
    },
    inputs: inputs,

    plugins: [
        createAutoAnimatePlugin(
            {
                /* optional AutoAnimate config */
                // default:
                duration: 250,
                easing: 'ease-in-out'
            },
            {
                /* optional animation targets object */
                // default:
                global: ['outer', 'inner'],
                form: ['form'],
                repeater: ['items']
            }
        )
    ]
});
