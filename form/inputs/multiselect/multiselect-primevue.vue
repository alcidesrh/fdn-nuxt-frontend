<template>
  <MultiSelect :id="props.context.id" v-model="value" display="chip" :options="context.options" optionLabel="label"
    filter fluid placeholder="Seleccionar" optionValue="value" @change="(v) => context.node.input(v.value)" />
</template>
<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';

const props = defineProps({
  context: Object,
  // options: []
})
const value = ref()


watch(() => props.context._value, (v) => {
  value.value = v
})


// watch(() => value.value, (v) => {
//   props.context.node.input(v)
// })
</script>
