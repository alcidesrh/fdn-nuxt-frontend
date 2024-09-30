import { createInput } from '@formkit/vue';
import selectprimevue from './textarea-primevue.vue';
const props = {
    modelValue: null,
    autoResize: Boolean,
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
    row: {
        type: Number,
        default: 5
    },
    col: {
        type: Number,
        default: 30
    }
};
const textarea_fdn = createInput(selectprimevue);
if (!textarea_fdn.props) {
    textarea_fdn.props = [];
}
textarea_fdn.props = [...textarea_fdn.props, ...Object.keys(props)];
export default textarea_fdn;
