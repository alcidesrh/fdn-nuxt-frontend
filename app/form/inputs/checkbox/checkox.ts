import { createInput } from '@formkit/vue'
import c from './checkox-primevue.vue'

const props = {}
const primevue_checkbox = createInput(c)
if (!primevue_checkbox.props) {
  primevue_checkbox.props = []
}
primevue_checkbox.props = [...primevue_checkbox.props, ...Object.keys(props)]
export default primevue_checkbox
