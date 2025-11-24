<template>
  <Password v-model="value" :value="context._value" @input="handleInput"
    v-bind="util.omitKeysContaining(props.context.node.props)" />
</template>
<script setup>
import Password from 'primevue/password'
const props = defineProps({
  context: Object,
})

const value = ref()
function handleInput(e) {
  props.context.node.input(e.target.value)
}
function reset() {
  value.value = ''
  props.context.node.input('')
}
</script>
