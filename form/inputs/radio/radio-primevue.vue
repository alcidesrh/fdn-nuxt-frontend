<script setup>
import RadioButton from 'primevue/radiobutton';
const props = defineProps({
  context: Object,
  options: []
})

const value = ref({})
watch(() => value.value, (v) => {
  props.context.node.input(v)
})
</script>
<template>
  <div>
    <div v-for="v, i in context.options" :key="i" class="flex items-center">
      <RadioButton :id="props.context.id" v-model="value" :inputId="i" name="dynamic" :value="v.name" />
      <label class="ml-2">{{ v.name }}</label>
    </div>
  </div>
</template>
