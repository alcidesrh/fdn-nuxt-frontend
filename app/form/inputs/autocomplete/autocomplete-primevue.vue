<script setup>
import Autocomplete from 'primevue/autocomplete'

const props = defineProps({
  context: Object,
})

const value = ref('')
const loading = ref(false)
</script>

<template>
  <Autocomplete
    :id="props.context.id" v-model="value" :option-label="context.optionLabel"
    :placeholder="context.placeholder" delay="1000" :loading="loading"
  />
</template>
