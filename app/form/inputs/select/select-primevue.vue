<template>
  <Select v-bind="util.omitKeysContaining(props.context.node.props)" :options="context.options"
    :default-value="defaultValue" @change="handleInput" />
</template>
<script setup lang="ts">
import Select from 'primevue/select'

const props = defineProps({
  context: Object,
})

const toBind = computed(() => util.omitKeysContaining(props.context.node.props, ['_', 'initial', 'definition', 'attrs', 'iconHandler', 'parsedRules']))


// cl(props.context.node.props)
// cl(toBind.value)
// cl(props.context)

const defaultValue = ref(props.context?._value?.id || props.context?._value)

watch(
  () => props.context._value,
  (v) => {

    defaultValue.value = props.context?._value?.id || v
  },
)
function handleInput(e) {
  props.context.node.input(e.value)
}
</script>
