<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';

const props = defineProps({
  context: Object,
  // options: []
})
const value = ref()

watch(() => value.value, (v) => {
  props.context.node.input(v)
})
</script>
<template>
  <MultiSelect v-model="value" display="chip" :options="context.options" optionLabel="label" filter fluid />
</template>
