import { createInput } from '@formkit/vue';
import c from './toggleswitch-primevue.vue';
const props = {
    modelValue: {
        type: null,
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
    }
};
const toggleswitch_fdn = createInput(c);
if (!toggleswitch_fdn.props) {
    toggleswitch_fdn.props = [];
}
toggleswitch_fdn.props = [...toggleswitch_fdn.props, ...Object.keys(props)];
export default toggleswitch_fdn;
