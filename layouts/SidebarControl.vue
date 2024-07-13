<script setup lang="ts">
import { colorOptions } from '~/utils/colors.js'
import { PlayCycle, SortThree, FreezeColumn } from '@icon-park/vue-next';
import { difference, compose, isEmpty } from 'ramda'

const menuStore = useMenuStateStore()

const floatWidget = useFloatWidgetStore()

const centrar = ref('')

function screenMidle(d: string) {
  if (d == 'Horizontal') {
    let el: Number = document.querySelector('.control')?.clientWidth || 0
    floatWidget.pX = Math.round((floatWidget.htmlW / 2) - el / 2)
    floatWidget.x = Math.round((floatWidget.pX / floatWidget.htmlW) * 100)
  }
  else if (d == 'Vertical') {
    let el = document.querySelector('.control')?.clientHeight
    floatWidget.pY = Math.round((floatWidget.htmlH / 2) - el / 2)
    floatWidget.y = Math.round((floatWidget.pY / floatWidget.htmlH) * 100)
  }
}

watch(() => centrar.value, (n, o) => {
  const diff = compose((d) => screenMidle(d), (v: any) => isEmpty(v) ? false : v[0], (n, o) => difference(n, o))
  diff(n, o)
})
</script>

<template>
  <FloatWidget>
    <template #menu>
      <div>
        <InputGroup>
          <Fieldset legend="Boton configuración" :toggleable="true"
            class="w-full [&>legend>button]:text-base [&>legend>button>span]:text-slate-600 u-mt-s">
            <div class="grid gap-3">
              <div class="flex">
                <InputGroup>
                  <FormKit v-model="menuStore.ctrlBtnHorizontal" type="radio" label="Mostrar"
                    :options="{ horizontal: 'Horizontal', vertical: 'Vertical' }" />
                </InputGroup>
                <InputGroup>
                  <FormKit v-model="centrar" type="checkbox" label="Centrar" :options="['Horizontal', 'Vertical']" />
                </InputGroup>
              </div>

              <div class="flex gap-1">
                <FormKit type="number" label="Alto" v-model="menuStore.btnW" />
                <FormKit type="number" label="Ancho" v-model="menuStore.btnH" />
                <FormKit type="number" label="Icono" v-model="menuStore.iconSize" />
                <FormKit type="number" label="Rotar" v-model="menuStore.rotate" />
                <FormKit type="number" label="Espacio" v-model="menuStore.gap" />
              </div>

              <FormKit v-model="menuStore.colorBtn" :value="menuStore.colorBtn" label="Color icono" type="autocomplete"
                :options="[{ label: 'Transparente', items: [{ label: 'Transparente', value: 'transparent' }] }, ...colorOptions]"
                inner-class="flex" outer-class="w-full">
              </FormKit>

              <FormKit v-model="menuStore.colorBorde" :value="menuStore.colorBorde" label="Color borde"
                type="autocomplete"
                :options="[{ label: 'Transparente', items: [{ label: 'Transparente', value: 'transparent' }] }, ...colorOptions]"
                inner-class="flex" outer-class="w-full">
              </FormKit>

              <FormKit v-model="menuStore.colorBtnBg" :value="menuStore.colorBtnBg" label="Color background"
                type="autocomplete"
                :options="[{ label: 'Transparente', items: [{ label: 'Transparente', value: 'transparent' }] }, ...colorOptions]"
                inner-class="flex" outer-class="w-full">
              </FormKit>

            </div>
          </Fieldset>
        </InputGroup>
      </div>
    </template>
    <template #default>
      <div class="sidebar-control-btn" :style="{ rotate: menuStore.rotate + 'deg', gap: menuStore.gap + 'rem' }"
        :class="[menuStore.mode, menuStore.ctrlBtnHorizontal == 'horizontal' ? 'flex flex wrap' : 'grid']">
        <Button raised class="p-button-icon-only" rounded outlined @click="menuStore.collapse = !menuStore.collapse"
          :style="{ borderColor: menuStore.colorBorde.value, backgroundColor: menuStore.colorBtnBg.value, width: menuStore.btnW + 'px', height: menuStore.btnH + 'px' }">
          <template #default>
            <!-- <Icon name="icon-park:double-down" size="24"></Icon> -->
            <sort-three theme="outline" :size="menuStore.iconSize" :fill="menuStore.colorBtn.value" :strokeWidth="4" />
            <!-- <sort-three theme="outline" :size="menuStore.iconSize" :fill="menuStore.colorBtn.value" /> -->

          </template>
        </Button>

        <Button raised class="p-button-icon-only" rounded outlined @click="menuStore.setMode('mini')"
          :style="{ borderColor: menuStore.colorBorde.value, backgroundColor: menuStore.colorBtnBg.value, width: menuStore.btnW + 'px', height: menuStore.btnH + 'px' }">
          <template #default>
            <freeze-column theme="outline" :size="menuStore.iconSize" :fill="menuStore.colorBtn.value"
              :strokeWidth="4" />

          </template>
        </Button>

        <Button raised class="p-button-icon-only w-40px h-40px" rounded outlined @click="menuStore.setMode('close')"
          :style="{ borderColor: menuStore.colorBorde.value, backgroundColor: menuStore.colorBtnBg.value, width: menuStore.btnW + 'px', height: menuStore.btnH + 'px' }">
          <template #default>
            <play-cycle theme="outline" :size="menuStore.iconSize" :fill="menuStore.colorBtn.value" />
          </template>
        </Button>
      </div>
    </template>
  </FloatWidget>
</template>
<style scoped>
.sidebar-control-btn {
  transition: all .3s;
  /* width: fit-content;
  height: fit-content; */
  align-items: center;
  justify-content: center;
  z-index: 999;

  &.close,
  &.mini {
    /* display: grid; */
    /* transform: translate(-85px, 70px); */
  }

  &.mini {
    /* transform: translate(-40px, 70px); */
  }

}
</style>
