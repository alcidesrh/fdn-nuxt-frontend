<script setup lang="ts">
const { edit = false } = defineProps<{ edit: boolean }>()

const emit = defineEmits(['cancel', 'delete'])
</script>

<template>
  <div class="right-2rem h-fit w-full flex justify-end gap-5 @4xl:w-fit @4xl:justify-end @2xl:justify-center">
    <Button type="submit" severity="primary" label="Guardar" icon="pi pi-save" />
    <Button label="Cancelar" severity="secondary" outlined icon="pi pi-list" @click="$emit('cancel')" />
    <Button v-if="edit" label="Eliminar" severity="danger" icon="pi pi-trash" @click="$emit('delete')" />
  </div>
</template>
