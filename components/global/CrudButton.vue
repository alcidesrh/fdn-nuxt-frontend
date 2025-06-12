<template>
  <div ref="crudbtnRef"
    class=" right-2rem  w-fit flex justify-end @2xl:justify-center @4xl:justify-end w-full @4xl:w-fit h-fit gap-5 ">
    <Button @click="$emit('submit')" severity="primary" label="Guardar" icon="pi pi-save" />
    <Button label="Cancelar" @click="$emit('cancel')" severity="secondary" outlined icon="pi pi-list" />
    <Button v-if="edit" label="Eliminar" severity="danger" icon="pi pi-trash" @click="$emit('delete')" />


  </div>
</template>
<script setup lang="ts">
const { edit = false } = defineProps<{ edit: boolean }>()

const emit = defineEmits(['cancel', 'submit', 'delete'])
const crudbtnRef = ref()
</script>
