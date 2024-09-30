<script setup>
import ToggleSwitch from 'primevue/toggleswitch';

const props = defineProps({
  context: Object,
})

const value = ref(false)

watch(() => value.value, (v) => {
  props.context.node.input(v)
})
</script>
<template>
  <ToggleSwitch v-model="value" />
</template>
