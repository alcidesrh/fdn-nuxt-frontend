import { createInput } from '@formkit/vue';
import c from './checkox-primevue.vue';
const props = {
    value: null,
    modelValue: null,
    binary: Boolean,
    name: {
        type: String,
        default: null
    },
    indeterminate: {
        type: Boolean,
        default: false
    },
    trueValue: {
        type: null,
        default: true
    },
    falseValue: {
        type: null,
        default: false
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
    required: {
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
    }
};
const primevue_checkbox = createInput(c);
if (!primevue_checkbox.props) {
    primevue_checkbox.props = [];
}
primevue_checkbox.props = [...primevue_checkbox.props, ...Object.keys(props)];
export default primevue_checkbox;
