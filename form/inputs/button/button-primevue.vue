<script setup>
import Button from 'primevue/button';

const props = defineProps({
  context: Object,
})

function handleInput(e) {
  props.context.node.input(e.target.value)
}
</script>
<template>
  <Button :id="props.context.id" label="Submit" />
</template>
