import { createInput } from '@formkit/vue';
import picklistprimevue from './picklist-primevue.vue';

const props = {
    // options: {
    //     type: Array,
    //     default: []
    // },
    allowItems: {
        type: Array,
        default: []
    },
    field: {
        type: String,
        default: null
    }
};
const picklist_primevue = createInput(picklistprimevue, {
    props: props
});

export default picklist_primevue;
