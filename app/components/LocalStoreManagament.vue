<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <i class="pi pi-times surface-contrast-600 absolute right-5px top-5px m-3 cursor-pointer" @click="$emit('close')" />
</template>
