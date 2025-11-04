<script setup lang="ts">
import MultiSelect from 'primevue/multiselect'

const props = defineProps({
  context: Object,
  // options: []
})
const value = ref()
const optionValue = ref('id')
watch(
  () => props.context._value,
  (v) => {
    cl(v)
    if (typeof v.collection != 'undefined') {
      value.value = v.collection.map(v => v.id)
      // Handle object case
    }
    else {
      // value.value = v
      value.value = v.map(v => v?.id || v)
    }
  },
)

function updateValue(event) {
  cl(event.value)

  props.context.node.input(event.value)
}
</script>

<template>
  <MultiSelect :id="props.context.id" :default-value="value" display="chip" :options="context.options"
    option-label="label" fluid filter placeholder="Seleccionar" :option-value="optionValue"
    @change="(v) => updateValue(v)" />
</template>
