<script setup lang="ts">
const { edit = false } = defineProps<{ edit: boolean }>()

const emit = defineEmits(['cancel', 'delete'])
</script>

<template>
  <div class="right-2rem @2xl:justify-center @4xl:justify-end @4xl:w-fit flex h-fit w-full justify-end gap-5">
    <Button type="submit" severity="primary" label="Guardar" icon="pi pi-save" />
    <Button label="Cancelar" severity="secondary" outlined icon="pi pi-list" @click="$emit('cancel')" />
    <Button v-if="edit" label="Eliminar" severity="danger" icon="pi pi-trash" @click="$emit('delete')" />
  </div>
</template>
