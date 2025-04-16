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
    },
    number: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: ''
    }
};
const primevue_text = createInput(textprimevue);

if (!primevue_text.props) {
    primevue_text.props = [];
}

primevue_text.props = [...primevue_text.props, ...Object.keys(props)];

export default primevue_text;
