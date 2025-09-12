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

<template>
  <Password :id="context.id" v-model="value" :feedback="false" :value="context._value" fluid :placeholder="context.placeholder" :size="context.size" toggle-mask @input="handleInput" />
</template>
