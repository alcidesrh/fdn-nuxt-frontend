import { createInput } from '@formkit/vue';
import selectprimevue from './iconinput-primevue.vue';
const props = {
    // modelValue: null,
    name: {
        type: String,
        default: null
    },

    icon: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: null
    }
};
const iconinput_primevue = createInput(selectprimevue, {
    props: props
});
export default iconinput_primevue;
