import { createInput } from '@formkit/vue';
import selectprimevue from './texticon-primevue.vue';
const props = {
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
    }
};
const primevue_texticon = createInput(selectprimevue, {
    props: props
});
// if (!texticon_fdn.props) {
// texticon_fdn.props = [];
// }
// texticon_fdn.props = [...    .props, ...Object.keys(props)];
export default primevue_texticon;
