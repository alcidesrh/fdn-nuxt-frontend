import { createInput } from '@formkit/vue'
import passwordprimevue from './password-primevue.vue'

const props = {
  modelValue: null,
  size: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  number: {
    type: Boolean,
    default: false,
  },
  password: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
}
const password_primevue = createInput(passwordprimevue)

if (!password_primevue.props) {
  password_primevue.props = []
}

password_primevue.props = [...password_primevue.props, ...Object.keys(props)]

export default password_primevue
