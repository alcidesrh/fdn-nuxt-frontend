<template>
  <Select @change="handleInput" :options="context.options" optionLabel="label" optionValue="value"
    :defaultValue="defaultValue" fluid placeholder="Seleccionar" />
</template>
<script setup lang="ts">
import Select from 'primevue/select';

const props = defineProps({
  context: Object,
})

const defaultValue = ref(props.context?._value?.id || props.context?._value);


watch(() => props.context._value, (v) => {
  defaultValue.value = props.context?._value?.id || v
})
function handleInput(e) {
  props.context.node.input(e.value)
}

</script>
