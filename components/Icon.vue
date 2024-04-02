<template>
  <component ref="icon" :is="`icon-${name}`" :size="temp.size" @mouseover.stop="hoverMenu('hover', $event)"
    @mouseleave="hoverMenu('leave', $event)">
  </component>
  <!-- {{ temp }} -->
</template>
<script setup lang="ts">
import { watch, ref } from 'vue'

const props = defineProps<{
  // fill?: Record<string, any>
  name?: number
}>()
const attrs = useAttrs()

const temp: Record<string, any> = ref({ size: '29' })
// let attr2 = { size: '29', strokeWidth: '2', theme: 'two-tone', fill: ['#475569', '#f1f5f9'], strokeLinecap: 'square', class: 'u-mx-xs cursor-pointer drop-shadow' }
// const attr2 = ref(props.attrs.value)





const icon = ref(null)

// watch(hover, (val) => {
//   if (val) {
//     attr.value.fill = ['#334155', '#10b981'];
//   }
//   else {
//     attr.value.fill = ['#334155', '#e2e8f0'];

//   }
// })

function hoverMenu(type: String, event: Event) {

  if (type == 'hover') {

    icon.value.$el.querySelector('path').setAttribute('fill', '#cbd5e1');
    // icon.value.$el.querySelector('svg').classList.add("stroke-cyan-500");
    // temp.value = ['#10b981', '#10b981'];
  }
  else {
    icon.value.$el.querySelector('path').setAttribute("fill", '#f1f5f9');
    // icon.value.$el.querySelector('svg').classList.add("stroke-cyan-500");


    // temp.value = ['#10b981', '#10b981'];

  }
}
onMounted(() => {

})
</script>
