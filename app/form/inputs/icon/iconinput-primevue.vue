<template>
  <IconField>

    <InputIcon v-if="context.icon">
      <Icon :name="context.icon" class="text-18px! " />
    </InputIcon>
    <InputText :id="props.context.id" v-model="typing" :defaultValue="context._value" fluid
      :class="[context.inputClass]" v-bind="context.attrs" @input="input" />
  </IconField>

</template>

<script setup>
import { Icon } from '#components'
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const props = defineProps({
  context: Object,
})
const typing = ref('')

function input() {
  props.context.node.input(typing.value)
}
</script>
<style scoped>
.p-inputicon {
  color: var(--p-surface-contrast-600);
}
</style>
