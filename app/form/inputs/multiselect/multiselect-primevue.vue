<template>
  <MultiSelect v-bind="util.omitKeysContaining(props.context.node.props)" :default-value="value"
    :options="context.options" :option-value="optionValue" @change="(v) => updateValue(v)" />
</template>
<script setup lang="ts">
import MultiSelect from 'primevue/multiselect'

const props = defineProps({
  context: Object,
  // options: []
})
const value = ref()
const optionValue = ref('id')
if (typeof props.context._value != 'undefined') {
  value.value = props.context._value.map(v => v?.id || v)
}
watch(
  () => props.context._value,
  (v) => {
    // if (typeof v.collection != 'undefined') {
    //   value.value = v.collection.map(v => v.id)
    //   // Handle object case
    // }
    // else {
    // value.value = v
    value.value = v.map(v => v?.id || v)
    // }
  },
)

function updateValue(event) {

  props.context.node.input(event.value)
}
</script>
