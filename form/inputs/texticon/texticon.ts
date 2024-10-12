import { createInput } from '@formkit/vue';
import selectprimevue from './texticon-primevue.vue';
const props = {
    // modelValue: null,
    name: {
        type: String,
        default: null
    },
    typeW: {
        type: String,
        default: null
    },
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
    icon: {
        type: Object
    },
    placeholder: {
        type: String,
        default: null
    },
    loading: {
        type: Boolean,
        default: false
    },
    inputClass: {
        type: [String, Object],
        default: null
    },
    eventbus: {
        type: [String],
        default: null
    },
    test: {
        type: [String],
        default: null
    }
};
const texticon_fdn = createInput(selectprimevue, {
    props: props
});
// if (!texticon_fdn.props) {
// texticon_fdn.props = [];
// }
// texticon_fdn.props = [...texticon_fdn.props, ...Object.keys(props)];
export default texticon_fdn;
