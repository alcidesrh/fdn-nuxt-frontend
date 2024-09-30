import { createInput } from '@formkit/vue';
import textprimevue from './text-primevue.vue';
const props = {
    modelValue: null,
    size: {
        type: String,
        default: null
    },
    invalid: {
        type: Boolean,
        default: false
    },
    variant: {
        type: String,
        default: null
    },
    fluid: {
        type: Boolean,
        default: null
    },
    floatLabel: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: null
    }
};
const text_fdn = createInput(textprimevue);
if (!text_fdn.props) {
    text_fdn.props = [];
}
text_fdn.props = [...text_fdn.props, ...Object.keys(props)];
export default text_fdn;
