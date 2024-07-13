<script setup lang="ts">
import { Draggable } from 'gsap/Draggable'
import { nextTick } from 'vue'
import { colorOptions } from '~/utils/colors'

const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
}
const floatWidget = useFloatWidgetStore()

const coord = computed(() => {
  return { left: floatWidget.x + 'px', top: floatWidget.y + 'px' }
})

const size = computed(() => { return { width: floatWidget.w + '%', height: floatWidget.h + '%' } })

const colorBg = [{ label: 'Transparente', items: [{ label: 'Transparente', value: 'transparent' }] }, ...colorOptions]

watch(() => floatWidget.mode, (n, o) => {
  if (n == 'editar') {
    nextTick(() => {
      init()
    })

  }
})

const gsap = useGsap
gsap.registerPlugin(Draggable)

onMounted(() => {

  const html = document.querySelector('html')
  const el = html.getBoundingClientRect()
  // floatWidget.htmlH = el.height
  // floatWidget.htmlW = el.width

  floatWidget.x = floatWidget.pX//Math.round((floatWidget.pX * 100) / floatWidget.htmlW) //Math.round((((floatWidget.pX * 100) / floatWidget.htmlW) * el.width) / 100)//Math.round((floatWidget.pX * el.width) / floatWidget.htmlW)
  floatWidget.y = floatWidget.pY//Math.round(((floatWidget.pY * 100) / floatWidget.htmlH) //Math.round((((floatWidget.pY * 100) / floatWidget.htmlH) * el.height) / 100)//Math.round((floatWidget.pX * el.width) / floatWidget.htmlW)
  // floatWidget.y = floatWidget.pY//Math.round((floatWidget.pY * el.height) / floatWidget.htmlH)
  // console.log(floatWidget.x, floatWidget.y)
  // floatWidget.pX = Math.round((floatWidget.x / 100) * floatWidget.htmlW)
  // floatWidget.pY = Math.round((floatWidget.y / 100) * floatWidget.htmlH)
  floatWidget.htmlH = el.height
  floatWidget.htmlW = el.width
  if (floatWidget.mode == 'editar') {
    init()
  }
})

function init() {
  Draggable.create(".control", {
    // type: "left,top",
    bounds: "html", trigger: '.actions-wrap',
    dragClickables: false,
    onDragEnd: function (data) {
      floatWidget.pX = data.x - data.offsetX
      floatWidget.pY = data.y - data.offsetY
      // floatWidget.x = Math.round((floatWidget.pX / floatWidget.htmlW) * 100)
      // floatWidget.y = Math.round((floatWidget.pY / floatWidget.htmlH) * 100)
    },
  });


  Draggable.create(".resize", {
    type: "left,top",
    activeCursor: 'col-resize',
    cursor: 'col-resize',
    bounds: { minX: -(`${floatWidget.w}%`), minY: -(`${floatWidget.h}%`), maxX: '100%', maxY: '100%' },
    onDrag: function (data) {

      floatWidget.w = Math.round(((Math.round(data.x - floatWidget.pX) + 15) * 100) / floatWidget.htmlW)
      floatWidget.h = Math.round(((Math.round(data.y - floatWidget.pY) + 15) * 100) / floatWidget.htmlH)

    },

  });

}

function setDrag() {
  Draggable.create(".popover-drag", {
    type: "left,top",
    bounds: "html", trigger: '.drag-popover',

  });
}
</script>

<template>

  <Popover v-if="floatWidget.mode == 'editar'" ref="op" content-class="pt-0!"
    class="popover-drag relative u-py-s z-1005 border border-neutral-300!" @show="setDrag">
    <div class="flex justify-between ">
      <div class="drag-popover">
        <Icon name="i-mdi-drag-variant" size="20" />
      </div>
      <Icon name="icon-park:close" class="cursor-pointer mr-3" size="20" @click="toggle" />
    </div>
    <div class="flex flex-col gap-4 gap-y-0 w-[25rem] ">
      <slot name="menu"></slot>
      <div>
        <Fieldset legend="Widget configuración" :toggleable="true"
          class="w-full [&>legend>button]:text-base [&>legend>button>span]:text-slate-600 u-mt-s">
          <InputGroup>
            <div class="flex gap-1">
              <FormKit type="number" label="Left" v-model="floatWidget.x" />
              <FormKit type="number" label="Top" v-model="floatWidget.y" />
              <FormKit type="number" label="Ancho" v-model="floatWidget.w" />
              <FormKit type="number" label="Alto" v-model="floatWidget.h" />
            </div>
          </InputGroup>
          <InputGroup>
            <div class="grid grid-cols-4 gap-2 items-center">
              <FormKit v-model="floatWidget.bg" :value="floatWidget.bg" label="Color background" type="autocomplete"
                :options="colorBg" inner-class="flex" outer-class="col-span-3">
              </FormKit>
            </div>
          </InputGroup>

          <InputGroup>
            <FormKit v-model="floatWidget.colorBorder" :value="floatWidget.colorBorder" label="Color borde"
              type="autocomplete" :options="colorBg" inner-class="flex" outer-class="w-full! h-fit  col-span-3">
            </FormKit>

          </InputGroup>
        </Fieldset>
      </div>

    </div>
  </Popover>

  <div class="control justify-center items-center flex" :style="{
    ...coord, ...size, backgroundColor: floatWidget.bg.value,
    border: floatWidget.colorBorder != 'none' ? `1px solid ${floatWidget.colorBorder.value}` : 'none'
  }">
    <div class="actions-wrap z-90" v-if="floatWidget.mode == 'editar'">
      <Icon class="drag" name="i-mdi-drag-variant" />
      <Button text rounded aria-label="Filter" @click="toggle" class="p-0!">
        <Icon name="icon-park:application-menu" />
      </Button>
    </div>
    <slot />
    <Icon v-show="floatWidget.mode == 'editar'" class="resize" size="35" name="lets-icons:resize-down-right-light" />
  </div>

</template>

<style scoped>
.control {
  @apply fixed z-998;
  left: 80px;
  top: 70px;
  /* padding: 5px 8px; */

  &>.actions-wrap {
    z-index: 9999;
    top: 0px;
    width: 100%;
    height: 30px;
    position: absolute;
    @apply flex justify-between items-center;

    & svg {
      height: 30px;
      width: 30px;
      fill: var(--surface-700);
      stroke-width: 0px;
      color: var(--surface-700);
      background-color: var(--surface-200);
      border-radius: 6px !important;
      padding: 2px;
    }

    &>button {
      border-radius: 0px !important;

      &:hover {
        background-color: transparent
      }
    }


  }

  &>.wrap-slot {
    width: 100%;
    height: 100%;
    @apply relative flex flex-wrap justify-center items-center overflow-cli;

  }

  &>.resize {
    right: 0px;
    bottom: 0px;
    z-index: 999;
    position: absolute;
    stroke-width: 1.5px;
  }
}
</style>
