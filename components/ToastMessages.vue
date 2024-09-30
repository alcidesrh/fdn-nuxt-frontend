<script setup>
import { useToast } from "primevue/usetoast";

const toast = useToast();
const bus = useEventBus('msg')
bus.on((data) => {
  const lifetime = {}// life: 5000 
  if (data.type == 'error') {
    toast.add({ ...lifetime, detail: data.msg, severity: 'error', summary: 'Error:', });
  }
  else {
    toast.add({ ...lifetime, severity: 'info', summary: 'Info', detail: data.detail, ...data });

  }
})

</script>
<template>

  <div class="card flex justify-center">
    <Toast class="z-999" />
  </div>
</template>
