<template>
  <div ref="crudbtnRef"
    class="fixed right-2rem bg-white w-fit flex justify-end @2xl:justify-center @4xl:justify-end w-full @4xl:w-fit h-fit gap-5 ">
    <Button v-if="edit" label="Eliminar" severity="danger" icon="pi pi-trash" @click="$emit('delete')" />
    <Button label="Cancelar" @click="$emit('cancel')" severity="secondary" outlined icon="pi pi-list" />
    <Button type="submit" severity="primary" label="Guardar" icon="pi pi-save" />

  </div>
</template>
<script setup lang="ts">
const { edit = false } = defineProps<{ edit: boolean }>()

const emit = defineEmits(['cancel', 'submit', 'delete'])
const crudbtnRef = ref()
onMounted(() => {
  const { width, height } = useWindowSize()
  let temp = '2rem'
  if (width.value > 1500) {
    temp = `${(width.value - 1500) / 2}px`
  }
  crudbtnRef.value.style.right = temp
})
</script>
