<template>
  <InputGroup>
    <DatePicker ref="d" v-model="date" dateFormat="dd/mm/yy" :selectionMode="context.selectionMode || 'single'" fluid
      :showTime="context.showTime" :hourFormat="context.hourFormat" :numberOfMonths="context.numberOfMonths"
      :hideOnRangeSelection="context.hideOnRangeSelection" :placeholder="context.placeholder" class="min-w-290px">

      <template #footer>
        <div class="flex justify-between u-my-1">
          <Button label="Cancel" outlined severity="contrast" @click="cancel" />
          <Button label="Aceptar" outlined @click="save" severity="contrast" />
        </div>
      </template>
    </DatePicker>
    <InputGroupAddon v-if="date">
      <i class="pi pi-times cursor-pointer" @click="cancel"></i>
    </InputGroupAddon>
    <InputGroupAddon>
      <i class="pi pi-calendar cursor-pointer" @click="d.overlayVisible = true"></i>
    </InputGroupAddon>

  </InputGroup>

</template>
<script setup>
const { dformat } = useDate()

const props = defineProps({
  context: Object,
  testing: String,
  $dateFormat: String
})
const date = ref();
const d = ref();
const bus = useEventBus('msg')
const save = () => {
  if (date.value == undefined) {
    bus.emit({ msg: 'Debe escoger la fecha', type: 'error' })
    return
  }
  if (props.context.selectionMode == 'range') {
    if (!date.value[1]) {
      bus.emit({ msg: 'Debe escoger un rango de días', type: 'error' })
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
