import { createInput } from '@formkit/vue';
import c from './autocomplete-primevue.vue';
const props = {
    placeholder: {
        type: String,
        default: null
    }
};
const primevue_autocomplete = createInput(c);
if (!primevue_autocomplete.props) {
    primevue_autocomplete.props = [];
}
primevue_autocomplete.props = [...primevue_autocomplete.props, ...Object.keys(props)];
export default primevue_autocomplete;
