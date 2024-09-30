<script setup>
import InputText from 'primevue/inputtext';
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
    <InputText :value="props.context._value" @input="handleInput" fluid :placeholder="context.placeholder" />
    <label for="username">{{ context.floatLabel }}</label>
  </FloatLabel>
  <InputText v-else :value="props.context._value" @input="handleInput" fluid :placeholder="context.placeholder" small />
</template>
