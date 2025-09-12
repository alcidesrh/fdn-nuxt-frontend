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
    <InputText v-if="context.number" :id="context.id" v-keyfilter.int :value="context._value" fluid :placeholder="context.placeholder" @input="handleInput" />
    <Password v-else-if="context.password" :id="context.id" :value="context._value" fluid :placeholder="context.placeholder" @input="handleInput" />
    <InputIcon v-if="context.icon && value" class="surface-contrast-500" :class="context.icon" @click="reset" />
  </IconField>
</template>
