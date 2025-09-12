<script setup>
const props = defineProps({
  context: Object,
})
const data = ref({
  date: '',
  text: '',
  checkbox: '',
  select: '',
  radio: '',
  textarea: '',
  toggleswitch: '',
  autoComplete: '',
})
const schema = [
  {
    $formkit: 'autoComplete_fdn',
    name: 'autoComplete',
    help: 'Select your household income',
  },
  {
    $formkit: 'datepicker_fdn',
    name: 'date',
    help: 'Select your household income',
    selectionMode: 'range',
    testing: 'sirvio',
  },
  {
    $formkit: 'text_primevue',
    label: 'label',
    name: 'text',
    help: 'help',
    __raw__sectionsSchema: {
      label: {
        children: [
          '$label',
          {
            if: '$value == formkit',
            then: {
              $el: 'span',
              attrs: {
                style: { color: 'green' },
              },
              children: [
                {
                  $el: 'span',
                  children: 'That\'s our name too!',
                  attrs: {
                    class: 'ml-2',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },
  {
    $formkit: 'texticon_fdn',
    name: 'texticon_fdn',
    icon: 'pi pi-search',
    iconPosition: 'left',
  },
  {
    $formkit: 'checkbox_fdn',
    name: 'checkbox',
    label_fdn: 'Select your household income',
  },
  {
    $formkit: 'radio_fdn',
    name: 'radio',
    options: [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ],
  },
  {
    $formkit: 'select_fdn',
    name: 'select',
    help: 'Select your household income',
    options: [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ],
  },
  {
    $formkit: 'textarea_fdn',
    name: 'textarea',
  },
  {
    $formkit: 'toggleswitch_fdn',
    name: 'toggleswitch',
  },
  {
    $formkit: 'button_fdn',
  },
]

const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])
</script>

<template>
  <card>
    <template #content>
      <div class="relative">
        <FormKit v-model="data" type="form" :actions="false">
          <FormKitSchema :schema="schema" :data="data" />
          <FormKit type="checkbox_fdn" label_fdn="Nombre" />
        </FormKit>
        {{ data }}
      </div>
    </template>
  </card>
</template>
