import { createInput } from '@formkit/vue'
import selectprimevue from './radio-primevue.vue'

const props = {
  options: {
    type: [],
    default: null,
  },
}
const radio_primevue = createInput(selectprimevue)
if (!radio_primevue.props) {
  radio_primevue.props = []
}
radio_primevue.props = [...radio_primevue.props, ...Object.keys(props)]
export default radio_primevue
