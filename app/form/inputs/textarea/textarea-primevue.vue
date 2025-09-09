<template>
  <Textarea :id="props.context.id" v-model="value" :rows="context.row" :cols="context.col" />
</template>
<script setup>
import Textarea from 'primevue/textarea';
const props = defineProps({
  context: Object,
  col: Number,
  row: Number
})

const value = ref('')
watch(() => value.value, (v) => {
  props.context.node.input(v)
})
</script>
