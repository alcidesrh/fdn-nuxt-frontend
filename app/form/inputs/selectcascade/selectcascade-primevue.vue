<script setup lang="ts">
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
  <CascadeSelect
    :default-value="defaultValue"
    :options="context.options"
    option-label="label"
    breakpoint="300px"
    option-group-label="label"
    fluid
    :option-group-children="['children', 'children']"
    placeholder="ruta..."
    option-value="name"
    @change="handleInput"
  />
</template>
