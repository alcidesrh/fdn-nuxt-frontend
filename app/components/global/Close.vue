<template>
    <i class="pi pi-times right-5px top-5px surface-contrast-600 absolute m-3 cursor-pointer" @click="$emit('close')" />
</template>
<script setup lang="ts">
const emit = defineEmits(['close']);
</script>
