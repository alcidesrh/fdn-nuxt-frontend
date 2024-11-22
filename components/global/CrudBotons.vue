<template>

  <Button @click="$emit('submit')" severity="primary" label="Guardar" icon="pi pi-save" />
  <Button label="Cancelar" @click="$emit('cancel')" severity="secondary" icon="pi pi-list" />
  <Button label="Eliminar" severity="danger" outlined class="bg-red-100 text-red-500" icon="pi pi-trash"
    @click="$emit('delete')" />

</template>
<script setup lang="ts">
const emit = defineEmits(['action'])
</script>
