<script setup lang="ts">
import Select from 'primevue/select';

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
  <Select v-model="value" :options="context.options" optionLabel="name" placeholder="Select a City" fluid />
</template>
