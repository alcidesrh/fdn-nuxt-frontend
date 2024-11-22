<template>
  <div>
    <ConfirmDialog>
      <template #message="{ message }">
        <span v-html="message.message"></span>
      </template>
    </ConfirmDialog>
  </div>

</template>
<script setup lang="ts">

import { useConfirm } from "primevue/useconfirm";

const props = defineProps({
  toggle: Boolean,
  data: Object
})
const chanel = ref('')

const emit = defineEmits(['accept', 'hide'])
let unsubscribe

const data = {
  ...{
    message: 'Do you want to delete this record?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancelar',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Eliminar',
      severity: 'danger'
    },
    accept: () => {
      if (chanel.value) {
        msgbus(chanel.value).emit(true);
        msgbus(chanel.value).off(unsubscribe)
      }
      else {
        emit('accept')
      }
    },
    reject: () => {
      emit('hide')
    },
    onHide: () => {
      emit('hide')
    }
  }, ...props.data
}
const confirm = useConfirm();

watch(() => props.toggle, (v) => {
  if (v) {
    confirm.require(data);
  }
  else {
    confirm.close()
  }
})

unsubscribe = msgbus(`remove`).on((v: any) => {

  confirm.require({ ...data, ...v });

  if (v.chanel) {
    chanel.value = v.chanel
  }
});

onUnmounted(() => {
  unsubscribe()
})

</script>
