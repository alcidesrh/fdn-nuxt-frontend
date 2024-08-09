<script setup>
import { useToast } from "primevue/usetoast";

const toast = useToast();
const bus = useEventBus('msg')
bus.on((data) => {
  toast.add({ ...{ severity: 'info', summary: 'Info', detail: 'no hay mensaje', life: 3000 }, ...data });
})
onUnmounted(() => {
  bus.reset()
})

</script>
<template>

  <div class="card flex justify-center">
    <Toast class="z-999" />
  </div>
</template>
