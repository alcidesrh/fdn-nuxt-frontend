<script setup>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const props = defineProps({
  context: Object,
})

const { stopLoading } = useCollection()

const typing = ref('')
const loading = ref(false)

const { start, isPending, stop } = useTimeoutFn(() => {
  loading.value = true
  props.context.node.input(typing.value)
}, 1000, { immediate: false })

function keyDown() {
  if (!loading.value) {
    if (!isPending.value) {
      stop()
    }
    start()
  }
}

watch(() => props.context.loading, (v) => {
  if (!v) {
    stop()
    loading.value = false
  }
})

watch(() => stopLoading.value, () => {
  loading.value = false
})

const icon = computed(() => props.context.hotload ? (loading.value ? 'pi pi-spin pi-spinner' : (typing.value ? 'pi pi-times cursor-pointer' : '')) : props.context.icon)

function reset() {
  loading.value = false
  typing.value = null
  props.context.node.input(null)
}

</script>
<template>
  <FloatLabel v-if="context.floatLabel">
    <InputIcon v-if="context.icon.position == 'left'" :class="context.icon" />
    <InputText v-model="typing" :value="props.context._value" @input="handleInput" fluid
      :placeholder="context.placeholder" />
    <InputIcon v-if="context.icon.position == 'right'" :class="context.icon" />
  </FloatLabel>
  <template v-else>
    <IconField>
      <InputText v-model="typing" @input="keyDown" fluid :placeholder="context.placeholder" />
      <InputIcon :class="icon" @click="reset" />
    </IconField>
  </template>


</template>
