<script setup>
import { useToast } from "primevue/usetoast";

const toast = useToast();
const bus = useEventBus('msg')
const error = useEventBus('error')
bus.on((data) => {
  const lifetime = {}// life: 5000 
  if (data.type == 'error') {
    toast.add({ ...lifetime, detail: data.msg || 'Ha ocurrido un error. Inténtelo de nuevo.', severity: 'error', summary: 'Error:', });
  }
  else {
    toast.add({ ...lifetime, severity: 'info', summary: 'Info', detail: data.detail, ...data });

  }
})

error.on((msg) => {
  const lifetime = {}// life: 5000 
  toast.add({ ...lifetime, detail: msg?.message || msg || 'Ha ocurrido un error. Inténtelo de nuevo.', severity: 'error', summary: 'Error:', });
})

</script>
<template>

  <div class="card flex justify-center">
    <Toast class="z-999" position="top-center" />
  </div>
</template>
