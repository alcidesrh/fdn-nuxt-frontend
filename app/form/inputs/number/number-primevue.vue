<template>
  <FloatLabel v-if="context.floatLabel">
    <InputNumber :id="props.context.id" :value="props.context._value" fluid input-id="integeronly"
      :placeholder="context.placeholder" @input="handleInput" />
    <label for="username">{{ context.floatLabel }}</label>
  </FloatLabel>
  <InputNumber v-else :id="props.context.id" v-model="value" fluid input-id="integeronly"
    :placeholder="context.placeholder" @input="handleInput" />
</template>
<script setup>
import FloatLabel from 'primevue/floatlabel'
import InputNumber from 'primevue/inputnumber'

const props = defineProps({
  context: Object,
})
const value = ref()
watch(() => props.context._value, v => value.value = v)
function handleInput(e) {
  props.context.node.input(e.value)
}
</script>
