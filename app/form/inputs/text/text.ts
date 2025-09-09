import { createInput } from '@formkit/vue';
import textprimevue from './text-primevue.vue';
const props = {
    modelValue: null,
    size: {
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
    password: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: ''
    }
};
const text_primevue = createInput(textprimevue);

if (!text_primevue.props) {
    text_primevue.props = [];
}

text_primevue.props = [...text_primevue.props, ...Object.keys(props)];

export default text_primevue;
