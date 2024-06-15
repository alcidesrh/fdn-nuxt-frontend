<template>
  <component ref="icon" :is="`icon-${name}`" :size="temp.size">
  </component>
  <!-- <component ref="icon" :is="`icon-${name}`" :size="temp.size" @mouseover.stop="hoverMenu('hover', $event)"
    @mouseleave="hoverMenu('leave', $event)">
  </component> -->
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  // fill?: Record<string, any>
  name?: string
}>()
const temp: Record<string, any> = ref({ size: '29' })

const icon = ref(null)


function hoverMenu(type: String, event: Event) {

  if (type == 'hover') {

    icon.value.$el.querySelector('path').setAttribute('fill', '#1e293b');
    // icon.value.$el.querySelector('svg').classList.add("stroke-cyan-500");
    // temp.value = ['#10b981', '#10b981'];
  }
  else {
    icon.value.$el.querySelector('path').setAttribute("fill", 'none');
    // icon.value.$el.querySelector('svg').classList.add("stroke-cyan-500");


    // temp.value = ['#10b981', '#10b981'];

  }
}
onMounted(() => {

})
</script>
