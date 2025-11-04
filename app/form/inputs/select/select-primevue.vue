<script setup lang="ts">
import Select from 'primevue/select'

const props = defineProps({
  context: Object,
})

const defaultValue = ref(props.context?._value?.id || props.context?._value)

watch(
  () => props.context._value,
  (v) => {
    defaultValue.value = props.context?._value?.id || v
  },
)
function handleInput(e) {
  props.context.node.input(e.value)
}
</script>

<template>
  <Select :options="context.options" option-label="label" option-value="id" :default-value="defaultValue" fluid
    placeholder="Seleccionar" @change="handleInput" />
</template>
