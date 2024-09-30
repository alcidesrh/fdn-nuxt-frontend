import { createInput } from '@formkit/vue';
import buttonprimevue from './button-primevue.vue';
const props = {
    label: {
        type: String,
        default: null
    },
    icon: {
        type: String,
        default: null
    },
    iconPos: {
        type: String,
        default: 'left'
    },
    iconClass: {
        type: String,
        default: null
    },
    badge: {
        type: String,
        default: null
    },
    badgeClass: {
        type: String,
        default: null
    },
    badgeSeverity: {
        type: String,
        default: 'secondary'
    },
    loading: {
        type: Boolean,
        default: false
    },
    loadingIcon: {
        type: String,
        default: undefined
    },
    as: {
        type: String,
        default: 'BUTTON'
    },
    asChild: {
        type: Boolean,
        default: false
    },
    link: {
        type: Boolean,
        default: false
    },
    severity: {
        type: String,
        default: null
    },
    raised: {
        type: Boolean,
        default: false
    },
    rounded: {
        type: Boolean,
        default: false
    },
    text: {
        type: Boolean,
        default: false
    },
    outlined: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: null
    },
    plain: {
        type: Boolean,
        default: false
    },
    fluid: {
        type: Boolean,
        default: null
    }
};
const button_fdn = createInput(buttonprimevue);
if (!button_fdn.props) {
    button_fdn.props = [];
}
button_fdn.props = [...button_fdn.props, ...Object.keys(props)];
export default button_fdn;
