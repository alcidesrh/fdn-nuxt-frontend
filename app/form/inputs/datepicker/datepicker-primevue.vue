<template>
  <InputGroup>
    <DatePicker :id="props.context.id" ref="d" v-model="date" date-format="dd/mm"
      :selection-mode="context.selectionMode || 'single'" fluid :show-time="context.showTime"
      :hour-format="String(context.hourFormat)" :number-of-months="context.numberOfMonths"
      :hide-on-range-selection="context.hideOnRangeSelection" class="min-w-200px" :class="[context.inputClass]">
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
      <li class="pi pi-calendar cursor-pointer text-slate-500" />
    </InputGroupAddon>
  </InputGroup>
</template>
<script setup>
const props = defineProps({
  context: Object,
})
const date = ref()
const d = ref()
function save() {
  if (date.value == undefined) {
    msg.emit({ severity: 'info', summary: 'Debe escoger la fecha', detail: 'Debe escoger la fecha' })
    return
  }
  if (props.context.selectionMode == 'range') {
    if (!date.value[1]) {
      props.context.node.input([{ after: cformat(date.value[0]) }])
      // msg.emit({ detail: 'Debe escoger un rango de días' })
      return
    }
    props.context.node.input([{ after: cformat(date.value[0]), before: cformat(date.value[1]) }])
    d.value.overlayVisible = false
  }
  else {
    props.context.node.input(date.value)
  }
}

function cancel() {
  d.value.overlayVisible = false
  date.value = null
  props.context.node.input(null)
}
</script>
