<template>
  <div class="flex justify-end @2xl:justify-center @4xl:justify-end w-full @4xl:w-fit h-fit gap-5 ">
    <Button type="submit" severity="primary" label="Guardar" icon="pi pi-save" />
    <Button label="Cancelar" @click="$emit('cancel')" severity="secondary" outlined icon="pi pi-list" />
    <Button v-if="edit" label="Eliminar" severity="danger" icon="pi pi-trash" @click="$emit('delete')" />
  </div>
</template>
<script setup lang="ts">
const { edit = false } = defineProps<{ edit: boolean }>()
// // const props = defineProps<{
// //   edit: {
// //     type: Boolean,
// //     default: false
// //   }
// }>()
const emit = defineEmits(['cancel', 'submit', 'delete'])
</script>
