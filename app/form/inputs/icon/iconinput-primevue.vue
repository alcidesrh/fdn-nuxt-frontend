<script setup>
import { Icon } from '#components'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

const props = defineProps({
  context: Object,
})
const typing = ref('')

function input() {
  props.context.node.input(typing.value)
}
</script>

<template>
  <IconField>
    <InputIcon v-if="context.icon">
      <Icon :name="context.icon" class="text-18px! " />
    </InputIcon>
    <InputText
      :id="props.context.id" v-model="typing" :default-value="context._value" fluid
      :class="[context.inputClass]" v-bind="context.attrs" @input="input"
    />
  </IconField>
</template>

<style scoped>
.p-inputicon {
  color: var(--p-surface-contrast-600);
}
</style>
