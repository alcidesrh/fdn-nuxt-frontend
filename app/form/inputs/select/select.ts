import { createInput } from '@formkit/vue'
import selectprimevue from './select-primevue.vue'

const props = { options: Array }
const select_primevue = createInput(selectprimevue)
if (!select_primevue.props) {
  select_primevue.props = []
}
select_primevue.props = [...select_primevue.props, ...Object.keys(props)]
export default select_primevue
