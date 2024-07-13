<script setup lang="ts">
import { ref } from 'vue'
import { createInput } from '@formkit/vue'
import OneTimePassword from '~/form/inputs/text.vue'
import Select2 from '~/form/inputs/select.vue'
import { colorOptions } from '~/utils/colors.js'
// const e = {
//   $cmp: Select2,
//   bind: '$attrs',
// }

const autocomplete = createInput(Select2,{
  props:['options']
})
const values = ref({})
const otp = createInput(OneTimePassword, {
  props: ['digits'],
})
</script>

<template>
  <FormKit type="form" v-model="values">
    <FormKit  type="radio"
            :options="{ horizontal: 'Horizontal', vertical: 'Vertical' }"  wrapper-class="flex" input-class="relative" />
    <FormKit :type="otp" digits="4" label="One-time password" name="two_factor_code"
      help="We’ve sent a code to your phone." validation="required" validation-visibility="live"/>

  </FormKit>

  <!-- This is just to help us visualize the data in our form: -->
  <pre wrap>{{ values }}</pre>
</template>
