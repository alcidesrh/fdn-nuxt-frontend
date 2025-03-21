<template>
  <FloatLabel v-if="context.floatLabel">
    <InputNumber :id="props.context.id" :value="props.context._value" @input="handleInput" fluid inputId="integeronly"
      :placeholder="context.placeholder" />
    <label for="username">{{ context.floatLabel }}</label>
  </FloatLabel>
  <InputNumber v-else :id="props.context.id" v-model="value" @input="handleInput" fluid inputId="integeronly"
    :placeholder="context.placeholder" />
</template>
<script setup>
import InputNumber from 'primevue/inputnumber';
import FloatLabel from 'primevue/floatlabel';
const props = defineProps({
  context: Object,
})
const value = ref()
watch(() => props.context._value, (v) => value.value = v)
function handleInput(e) {
  props.context.node.input(e.value)
}
</script>
