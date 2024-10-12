<template>
  <InputGroup>

    <DatePicker ref="d" v-model="date" dateFormat="dd/mm" :selectionMode="context.selectionMode || 'single'" fluid
      :showTime="context.showTime" :hourFormat="String(context.hourFormat)" :numberOfMonths="context.numberOfMonths"
      :hideOnRangeSelection="context.hideOnRangeSelection" class="min-w-200px" :class="[context.inputClass]">

      <template #footer>
        <div class="flex justify-between u-my-1">
          <Button label="Cancel" outlined severity="contrast" @click="cancel" />
          <Button label="Aceptar" outlined @click="save" severity="contrast" />
        </div>
      </template>

    </DatePicker>

    <InputGroupAddon v-if="date" @click="cancel">
      <i class="pi pi-times cursor-pointer"></i>
    </InputGroupAddon>
    <InputGroupAddon v-else @click="d.overlayVisible = true" pt:root:class="py-6px">
      <li class="text-slate-500 pi pi-calendar cursor-pointer" />
    </InputGroupAddon>
  </InputGroup>
</template>
<script setup>

const props = defineProps({
  context: Object,
})
const date = ref();
const d = ref();
const save = () => {
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
