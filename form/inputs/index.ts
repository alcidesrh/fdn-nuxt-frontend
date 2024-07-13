import { createInput } from '@formkit/vue'

import btn from './button.vue'
import datepickerPrimevue from './datepicker.vue'
import autocomplete from './autocomplete'

const CustomButton = createInput(btn)
const CustomDatepicker = createInput(datepickerPrimevue)

export const inputs = {
  CustomButton,
  CustomDatepicker,
  autocomplete,
}
