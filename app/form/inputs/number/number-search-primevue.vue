<template>
  <IconField>
    <InputText :id="props.context.id" v-model="typing" v-keyfilter.int :default-value="context._value" fluid
      :class="[context.inputClass]" v-bind="context.attrs" :disabled="loading" @input="keyDown" />
    <InputIcon class="surface-contrast-500" :class="icon" @click="reset" />
  </IconField>
</template>
<script setup>
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

const props = defineProps({
  context: Object,
})

const inputId = ref(0)
const typing = ref('')
const loading = ref(false)
const { start: startError, isPending: isPendingError, stop: stopError } = useTimeoutFn(() => {
  loading.value = false
}, 5000, { immediate: false })

const { start, isPending, stop } = useTimeoutFn(async () => {
  loading.value = true
  inputId.value = props.context.id

  let value = typing.value
  if (props.context.node.name == 'id') {
    value = value ? Number(value) : null
  }
  await props.context.node.input(value.toString())
  startError()
  msgbus(props.context.eventbus).emit({ collection: 'reload' })
}, 1000, { immediate: false })

function keyDown() {
  if (!loading.value) {
    if (!isPending.value) {
      stop()
      stopError()
    }
    start()
  }
}
watch(() => cloading.value, (v) => {
  if (!v) {
    if (isPending) {
      stop()
    }
    if (isPendingError) {
      stopError()
    }
    loading.value = false
    if (inputId.value) {
      const el = document.getElementById(inputId.value)
      nextTick(() => el.focus())
      inputId.value = 0
    }
  }
})

const icon = computed(() => loading.value ? 'pi pi-spin pi-spinner' : (typing.value || props.context._value ? 'pi pi-times cursor-pointer' : 'pi pi-search opacity-70'))

async function reset() {
  loading.value = false
  typing.value = null
  await props.context.node.input(null)
  msgbus(props.context.eventbus).emit({ collection: 'reload' })

}
</script>
