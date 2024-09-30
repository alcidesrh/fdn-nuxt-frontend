<template>
  <div>
    <!-- <template #content> -->
    <div class="relative">
      <FormKit type="form" :actions="false" form-class="flex flex-wrap gap-5" :config="{
        outerClass: ''
      }" v-model="model">
        <FormKitSchema :schema="schema" :data="filter" />
      </FormKit>
    </div>
    <!-- </template> -->
  </div>
</template>
<script setup lang="ts">

const { filter } = useCollection()
const props = defineProps({
  loading: Boolean,
})
const model = defineModel()
// const data = filter.value
filter.value.loading = computed(() => props.loading)


const schema = [
  {
    $formkit: 'texticon_fdn',
    name: 'id',
    placeholder: 'Id',
    outerClass: ' max-w-150px!',
    hotload: true,
    loading: '$loading',
  },
  {
    $formkit: 'texticon_fdn',
    name: 'nombre',
    placeholder: 'nombre',
    hotload: true,
    loading: '$loading'
  },
  {
    $formkit: 'texticon_fdn',
    name: 'username',
    placeholder: 'usuario',
    hotload: true,
    loading: '$loading'
  },
  {
    $formkit: 'datepicker_fdn',
    name: 'createdAt',
    selectionMode: 'range',
    hourFormat: 12,
    showTime: true,
    placeholder: 'Rango de Fechas',
    outerClass: 'min-w-370px',
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
      { name: 'Paris', code: 'PRS' }
    ]
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
      { name: 'Paris', code: 'PRS' }
    ]
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
  }

]
</script>
<style scoped>
nav {
  --spacing: 10px;
  gap: var(--spacing);
  padding: var(--spacing);
}
</style>
