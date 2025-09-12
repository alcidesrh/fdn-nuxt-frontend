<script setup>
const props = defineProps({
  context: Object,
})
const date = ref()
const d = ref()
function save() {
  if (date.value == undefined) {
    merror('Debe escoger la fecha')
    return
  }
  if (props.context.selectionMode == 'range') {
    if (!date.value[1]) {
      merror('Debe escoger un rango de días')
      return
    }
    props.context.node.input([{ after: dformat(date.value[0]), before: dformat(date.value[1]) }])
    d.value.overlayVisible = false
  }
  else {
    props.context.node.input(date.value)
  }
}

function cancel() {
  d.value.overlayVisible = false
  date.value = null
  props.context.node.input({ after: null, before: null })
}
</script>

<template>
  <InputGroup>
    <DatePicker
      :id="props.context.id" ref="d" v-model="date" date-format="dd/mm"
      :selection-mode="context.selectionMode || 'single'" fluid :show-time="context.showTime"
      :hour-format="String(context.hourFormat)" :number-of-months="context.numberOfMonths"
      :hide-on-range-selection="context.hideOnRangeSelection" class="min-w-200px" :class="[context.inputClass]"
    >
      <template #footer>
        <div class="flex justify-between u-my-1">
          <Button label="Cancelar" outlined severity="contrast" @click="cancel" />
          <Button label="Aceptar" outlined severity="contrast" @click="save" />
        </div>
      </template>
    </DatePicker>

    <InputGroupAddon v-if="date" @click="cancel">
      <i class="pi pi-times cursor-pointer" />
    </InputGroupAddon>
    <InputGroupAddon v-else pt:root:class="py-6px" @click="d.overlayVisible = true">
      <li class="text-slate-500 pi pi-calendar cursor-pointer" />
    </InputGroupAddon>
  </InputGroup>
</template>
