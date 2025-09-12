import { createInput } from '@formkit/vue'
import c from './toggleswitch-primevue.vue'

const props = {}
const primeveu_toggleswitch = createInput(c)
if (!primeveu_toggleswitch.props) {
  primeveu_toggleswitch.props = []
}
primeveu_toggleswitch.props = [...primeveu_toggleswitch.props, ...Object.keys(props)]
export default primeveu_toggleswitch
