import { createInput } from '@formkit/vue'
import Select2 from './select.vue'

const autocomplete = createInput(Select2, {
  props: ['options', 'value'],
})

export default autocomplete
