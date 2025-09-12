import { createInput } from '@formkit/vue'
import multiselect from './multiselect-primevue.vue'

const props = { options: Array }

const multiselect_primevue = createInput(multiselect)
if (!multiselect_primevue.props) {
  multiselect_primevue.props = []
}
multiselect_primevue.props = [...multiselect_primevue.props, ...Object.keys(props)]
export default multiselect_primevue
