<script setup>
import Checkbox from 'primevue/checkbox';
const props = defineProps({
  context: Object,
})

const value = ref(props.context.attrs.value || false)
watch(() => value.value, (v) => {
  props.context.node.input(v)
})
</script>
<template>
  <div class="flex items-center">
    <Checkbox v-model="value" :binary="true" @input="handleInput" />
    <label v-if="context.attrs.label_fdn" v-text="context.attrs.label_fdn" for="ingredient1" class="ml-2" />
  </div>
</template>
