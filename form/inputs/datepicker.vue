<script setup>

import DatePicker from 'primevue/datepicker';

import { ref } from "vue";

const props = defineProps({
  context: Object,
})
function handleInput(e) {
  props.context.node.input(e.target.value)
}
const date = ref();

</script>

<template>
  <DatePicker v-model="date" />
</template>
