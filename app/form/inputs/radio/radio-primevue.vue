<template>
  <div>
    <div v-for="(v, i) in context.options" :key="i" class="flex items-center">
      <RadioButton v-bind="util.omitKeysContaining(props.context.node.props)" v-model="value" :input-id="i"
        :value="v.name" />
      <label class="ml-2">{{ v.name }}</label>
    </div>
  </div>
</template>
<script setup>
import RadioButton from 'primevue/radiobutton'

const props = defineProps({
  context: Object,
  options: [],
})

const value = ref({})
watch(
  () => value.value,
  (v) => {
    props.context.node.input(v)
  },
)
</script>
