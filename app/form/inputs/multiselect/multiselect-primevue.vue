<script setup lang="ts">
import MultiSelect from 'primevue/multiselect'

const props = defineProps({
  context: Object,
  // options: []
})
const value = ref()

watch(
  () => props.context._value,
  (v) => {
    if (typeof v.collection != 'undefined') {
      value.value = v.collection.map(v => v.id)
      // Handle object case
    }
    else {
      value.value = v
    }
  },
)

function updateValue(event) {
  props.context.node.input(value.value)
}
</script>

<template>
  <MultiSelect
    :id="props.context.id"
    v-model="value"
    display="chip"
    :options="context.options"
    option-label="label"
    filter
    fluid
    placeholder="Seleccionar"
    option-value="value"
    @change="(v) => updateValue(v)"
  />
</template>
