import { createInput } from '@formkit/vue'
import selectprimevue from './iconinput-primevue.vue'

const props = {
  icon: {
    type: String,
    default: null,
  },
}
const iconinput_primevue = createInput(selectprimevue, {
  props,
})
export default iconinput_primevue
