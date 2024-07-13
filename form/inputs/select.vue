<script setup>
import Select from 'primevue/select'
const props = defineProps({
  context: Object,
})

const color = ref(props.context.value)

watch(() => color.value, (n, o) => {
  props.context.node.input(n)
})
</script>
<template>
  <Select v-model="color" label="Color boton (icono y borde)" filter :options="props.context.options"
    optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder="Seleccionar color"
    class="w-full md:w-56">
    <template #value="data">
      <div class="flex items-center">
        <span class="w-50px h-20px mr-2 border border-slate-300 " :style="{ backgroundColor: data.value.value }"></span>
        <div class="capitalize">{{ data.value.label }}</div>
      </div>
    </template>
    <template #optiongroup="slotProps">
      <div class="flex items-center">
        <div class="capitalize">{{ slotProps.option.label }}</div>
      </div>
    </template>
    <template #option="data">
      <div class="flex items-center">
        <span class="w-50px h-20px mr-2 border border-slate-300 "
          :style="{ backgroundColor: data.option.value }"></span>
        <div class="capitalize">{{ data.option.label }}</div>
      </div>
    </template>
  </Select>
</template>
