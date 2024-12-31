<template>
  <IconField>
    <InputText v-model="typing" @input="keyDown" fluid :class="[context.inputClass]" v-bind="context.attrs" />
    <InputIcon class="surface-contrast-500" :class="icon" @click="reset" />
  </IconField>

</template>

<script setup>
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const props = defineProps({
  context: Object,
})
const typing = ref('')
const loading = ref(false)
const { start: startError, isPending: isPendingError, stop: stopError } = useTimeoutFn(() => {
  loading.value = false
  msgbus(props.context.eventbus).emit(false)
  merror()

}, 5000, { immediate: false })

const { start, isPending, stop } = useTimeoutFn(() => {
  loading.value = true

  msgbus(props.context.eventbus).emit(true)
  let value = typing.value
  if (props.context.node.name == 'id') {
    value = Number(value)
  }
  props.context.node.input(value)
  startError()

}, 500, { immediate: false })

function keyDown() {
  if (!loading.value) {
    if (!isPending.value) {
      stop()
      stopError()
    }
    start()
  }
}
watch(() => props.context.loading, (v) => {
  if (!v) {
    if (isPending) {
      stop()
    }
    if (isPendingError) {
      stopError()
    }
    loading.value = false
  }
})

const icon = computed(() => loading.value ? 'pi pi-spin pi-spinner' : (typing.value ? 'pi pi-times cursor-pointer' : 'pi pi-search opacity-70'))

function reset() {
  loading.value = false
  typing.value = null
  props.context.node.input(null)
}
</script>
