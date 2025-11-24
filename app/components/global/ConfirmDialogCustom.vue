<template>
  <div>
    <ConfirmDialog>
      <template #message="slotProps">
        <div class="flex  items-center w-full gap-2 ">
          <i :class="[slotProps.message.icon, action == 'remove' ? 'text-red-500' : '']" class="text-l "></i>
          <p v-html="slotProps.message.message"></p>
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>
<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps({
  toggle: Boolean,
  data: Object,
})
const emit = defineEmits(['accept', 'hide'])

const chanel = ref('')

const action = ref()

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
      icon: 'pi pi-info-circle',
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
  action.value = 'remove'
  const acceptProps = {
    label: 'Eliminar',
    severity: 'danger',
    icon: 'pi pi-trash',
  }
  confirm.require({ ...data, ...v, icon: 'pi pi-trash', header: 'Eliminar', acceptProps: acceptProps })

  if (v.chanel) {
    chanel.value = v.chanel
  }
})

onUnmounted(() => {
  unsubscribe()
})
</script>
