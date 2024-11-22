<template>
  <!-- <div class="card flex justify-center"> -->
  <Toast class="z-999 h-fit" position="top-center" />
  <!-- </div> -->
</template>
<script setup lang="ts">
import { useToast } from "primevue/usetoast";

const toast = useToast();
const bus = useEventBus('msg')
const error = useEventBus('error')
bus.on((msg: any) => {

  const lifetime = msg?.life === false ? {} : { life: 5000 }// life: 5000 
  toast.add({ ...lifetime, detail: msg?.msg || msg || 'Mensaje vacio.', severity: msg?.severity || 'success', summary: 'Info:', });

  // const lifetime = { life: 5000 }// life: 5000 
  // if (data.type == 'error') {
  //   toast.add({ ...lifetime, detail: data.msg || 'Ha ocurrido un error. Inténtelo de nuevo.', severity: 'error', summary: 'Error:', });
  // }
  // else {
  //   toast.add({ ...lifetime, severity: 'info', summary: 'Info', detail: data.detail, ...data });

  // }
})

error.on((msg: any) => {
  const lifetime = msg?.life === false ? {} : { life: 5000 }// life: 5000 
  toast.add({ ...lifetime, detail: msg?.message || msg || 'Ha ocurrido un error. Inténtelo de nuevo.', severity: 'error', summary: 'Error:', });
})

</script>
