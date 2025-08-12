<template>
    <IconField>
        <InputText v-if="context.number" :id="context.id" v-keyfilter.int :value="context._value" @input="handleInput" fluid :placeholder="context.placeholder" />
        <Password v-else-if="context.password" :id="context.id" :value="context._value" @input="handleInput" fluid :placeholder="context.placeholder" />
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
