import { createInput } from '@formkit/vue'
import selectprimevue from './textarea-primevue.vue'

const props = {
  row: {
    type: Number,
    default: 5,
  },
  col: {
    type: Number,
    default: 30,
  },
}
const primevue_autocomplete = createInput(selectprimevue)
if (!primevue_autocomplete.props) {
  primevue_autocomplete.props = []
}
primevue_autocomplete.props = [...primevue_autocomplete.props, ...Object.keys(props)]
export default primevue_autocomplete
