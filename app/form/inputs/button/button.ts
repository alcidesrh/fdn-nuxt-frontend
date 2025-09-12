import { createInput } from '@formkit/vue'
import buttonprimevue from './button-primevue.vue'

const props = {}
const primevue_button = createInput(buttonprimevue)
if (!primevue_button.props) {
  primevue_button.props = []
}
primevue_button.props = [...primevue_button.props, ...Object.keys(props)]
export default primevue_button
