<script setup lang="ts">
const { edit = false } = defineProps<{ edit: boolean }>()

const emit = defineEmits(['cancel', 'delete'])
</script>

<template>
  <div class=" h-fit w-full flex justify-end gap-5">
    <slot name="CrudSubmitButton">
      <Button type="submit" severity="primary" label="Guardar" icon="pi pi-save" :loading="!!gloading" />
    </slot>
    <Button label="Cancelar" severity="secondary" outlined icon="pi pi-list" @click="$emit('cancel')" />
    <Button v-if="edit" label="Eliminar" severity="danger" icon="pi pi-trash" @click="$emit('delete')" />
  </div>
</template>
