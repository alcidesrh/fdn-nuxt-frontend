<script setup>
import Button from 'primevue/button';

const props = defineProps({
    context: Object
});
</script>
<template>
    <Button v-bind="context.attrs.binds" />
</template>
