<template>
  <Button @click="$emit('submit')" severity="primary" label="Guardar" icon="pi pi-save" />
  <Button label="Cancelar" @click="$emit('cancel')" severity="secondary" outlined icon="pi pi-list" />
  <Button label="Eliminar" severity="danger" icon="pi pi-trash" @click="$emit('delete')" />
</template>
<script setup lang="ts">
const emit = defineEmits(['cancel', 'submit', 'delete'])
</script>
