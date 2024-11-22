<template>
  <i class="pi pi-times absolute right-5px top-5px m-3 cursor-pointer surface-contrast-600" @click="$emit('close')" />
</template>
<script setup lang="ts">
const emit = defineEmits(['close'])
</script>
