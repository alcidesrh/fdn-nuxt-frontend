import { createInput } from '@formkit/vue'

import btn from './button.vue'
import datepickerPrimevue from './datepicker.vue'
import textPrimevue from './text.vue'

const CustomButton = createInput(btn)
const CustomDatepicker = createInput(datepickerPrimevue)
const CustomInputText = createInput(textPrimevue)

export const inputs = {
  CustomButton,
  CustomDatepicker,
  // CustomInputText,
}
