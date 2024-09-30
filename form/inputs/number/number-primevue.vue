<script setup>
import InputNumber from 'primevue/inputnumber';
import FloatLabel from 'primevue/floatlabel';
const props = defineProps({
  context: Object,
})

function handleInput(e) {
  props.context.node.input(e.target.value)
}
</script>
<template>
  <FloatLabel v-if="context.floatLabel">
    <InputNumber :value="props.context._value" @input="handleInput" fluid inputId="integeronly"
      :placeholder="context.placeholder" />
    <label for="username">{{ context.floatLabel }}</label>
  </FloatLabel>
  <InputNumber v-else :value="props.context._value" @input="handleInput" fluid inputId="integeronly"
    :placeholder="context.placeholder" />
</template>
