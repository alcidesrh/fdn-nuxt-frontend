<template>
    <Password v-model="value" :feedback="false" :id="context.id" :value="context._value" @input="handleInput" fluid :placeholder="context.placeholder" :size="context.size" toggleMask />
</template>
<script setup>
import Password from 'primevue/password';

const props = defineProps({
    context: Object
});
const value = ref();
function handleInput(e) {
    props.context.node.input(e.target.value);
}
function reset() {
    value.value = '';
    props.context.node.input('');
}
</script>
