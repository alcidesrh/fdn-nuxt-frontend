<template>
    <CascadeSelect
        @change="handleInput"
        :defaultValue="defaultValue"
        :options="context.options"
        optionLabel="label"
        breakpoint="300px"
        optionGroupLabel="label"
        fluid
        :optionGroupChildren="['children', 'children']"
        placeholder="ruta..."
        optionValue="name"
    />
</template>
<script setup lang="ts">
const props = defineProps({
    context: Object
});
const defaultValue = ref(props.context?._value?.id || props.context?._value);

watch(
    () => props.context._value,
    (v) => {
        defaultValue.value = props.context?._value?.id || v;
    }
);
function handleInput(e) {
    props.context.node.input(e.value);
}
</script>
