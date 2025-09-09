<template>
    <IconField>
        <InputText v-model="value" :id="context.id" :value="context._value" @input="handleInput" fluid :placeholder="context.placeholder" :size="context.size" />
        <InputIcon v-if="context.icon && value" class="surface-contrast-500" :class="context.icon" @click="reset" />
    </IconField>
</template>
<script setup>
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

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
