import { createInput } from '@formkit/vue';
import fieldset from './fieldset-primevue.vue';
const props = {
    legend: String,
    toggleable: Boolean,
    collapsed: Boolean,
    toggleButtonProps: {
        type: null,
        default: null
    }
};

const fieldset_fdn = createInput(fieldset);
if (!fieldset_fdn.props) {
    fieldset_fdn.props = [];
}
fieldset_fdn.props = [...fieldset_fdn.props, ...Object.keys(props)];
export default fieldset_fdn;
