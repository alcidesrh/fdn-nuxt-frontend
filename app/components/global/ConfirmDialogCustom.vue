<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps({
  toggle: Boolean,
  data: Object,
})
const emit = defineEmits(['accept', 'hide'])

const chanel = ref('')

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
      outlined: true,
    },
    acceptProps: {
      label: 'Eliminar',
      severity: 'danger',
    },
    accept: () => {
      if (chanel.value) {
        msgbus(chanel.value).emit(true)
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
    },
  },
  ...props.data,
}
const confirm = useConfirm()

watch(() => props.toggle, (v) => {
  if (v) {
    confirm.require(data)
  }
  else {
    confirm.close()
  }
})

unsubscribe = msgbus(`remove`).on((v: any) => {
  confirm.require({ ...data, ...v, header: 'Eliminar' })

  if (v.chanel) {
    chanel.value = v.chanel
  }
})

onUnmounted(() => {
  unsubscribe()
})
</script>

<template>
  <div>
    <ConfirmDialog>
      <template #closeicon>
        <close @close="hidden" />
      </template>
      <template #message="{ message }">
        <span class="u-text-1" v-html="message.message" />
      </template>
    </ConfirmDialog>
  </div>
</template>
