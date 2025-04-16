import { createInput } from '@formkit/vue';
import selectprimevue from './radio-primevue.vue';
const props = {
    value: null,
    modelValue: null,
    binary: Boolean,
    name: {
        type: String,
        default: null
    },
    variant: {
        type: String,
        default: null
    },
    invalid: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    tabindex: {
        type: Number,
        default: null
    },
    inputId: {
        type: String,
        default: null
    },
    inputClass: {
        type: [String, Object],
        default: null
    },
    inputStyle: {
        type: Object,
        default: null
    },
    ariaLabelledby: {
        type: String,
        default: null
    },
    ariaLabel: {
        type: String,
        default: null
    },
    options: {
        type: [],
        default: null
    }
};
const primevue_radio = createInput(selectprimevue);
if (!primevue_radio.props) {
    primevue_radio.props = [];
}
primevue_radio.props = [...primevue_radio.props, ...Object.keys(props)];
export default primevue_radio;
