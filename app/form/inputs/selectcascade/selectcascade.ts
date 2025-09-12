import { createInput } from '@formkit/vue'
import selectcascade from './selectcascade-primevue.vue'

const props = {
  options: Array,
}
const selectcascade_primevue = createInput(selectcascade)
if (!selectcascade_primevue.props) {
  selectcascade_primevue.props = []
}
selectcascade_primevue.props = [...selectcascade_primevue.props, ...Object.keys(props)]
export default selectcascade_primevue
