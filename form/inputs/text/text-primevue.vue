<template>
  <FloatLabel v-if="context.floatLabel">
    <InputText :id="props.context.id" :v-keyfilter.int="context['v-keyfilter.int']" :value="props.context._value"
      @input="handleInput" fluid :placeholder="context.placeholder" />
    <label for="username">{{ context.floatLabel }}</label>
  </FloatLabel>
  <InputText v-else-if="context.number" :id="props.context.id" v-keyfilter.int :value="props.context._value"
    @input="handleInput" fluid :placeholder="context.placeholder" />
  <InputText v-else :id="props.context.id" :value="props.context._value" @input="handleInput" fluid
    :placeholder="context.placeholder" />
</template>
<script setup>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
const props = defineProps({
  context: Object,
})
function handleInput(e) {

  props.context.node.input(e.target.value)
}
</script>
