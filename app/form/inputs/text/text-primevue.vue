<script setup>
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

const props = defineProps({
  context: Object,
})
const value = ref()
function handleInput(e) {
  props.context.node.input(e.target.value)
}
function reset() {
  value.value = ''
  props.context.node.input('')
}
</script>

<template>
  <IconField>
    <InputText :id="context.id" v-model="value" :value="context._value" fluid :placeholder="context.placeholder" :size="context.size" @input="handleInput" />
    <InputIcon v-if="context.icon && value" class="surface-contrast-500" :class="context.icon" @click="reset" />
  </IconField>
</template>
