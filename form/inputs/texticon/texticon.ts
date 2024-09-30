import { Boo } from './../../../graphql/graphql';
import { createInput } from '@formkit/vue';
import selectprimevue from './texticon-primevue.vue';
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
    hotload: {
        type: Boolean,
        default: false
    }
};
const texticon_fdn = createInput(selectprimevue);
if (!texticon_fdn.props) {
    texticon_fdn.props = [];
}
texticon_fdn.props = [...texticon_fdn.props, ...Object.keys(props)];
export default texticon_fdn;
