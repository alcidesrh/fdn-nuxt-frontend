<script setup>
import AppTopbar from './AppTopbar.vue'
import AppMenu from './AppMenu.vue'
import { DomHandler } from '@primevue/core/utils'

const menuStore = useMenuStateStore()
const route = useRoute()
console.log(menuStore.collapse, menuStore.menu)
watch(() => route, () => {
  menuStore.active = false;
  DomHandler.unblockBodyScroll('blocked-scroll');
  // this.$toast.removeAllGroups(); 
})


function onMenuButtonClick() {
  menuStore.active = !menuStore.active

  if (!menuStore.active) {
    DomHandler.unblockBodyScroll('blocked-scroll');
  } else {
    DomHandler.blockBodyScroll('blocked-scroll');
  }

}
function onMaskClick() {
  menuStore.active = false;
  DomHandler.unblockBodyScroll('blocked-scroll');
}

</script>
<template>
  <div class="layout-wrapper">
    <AppTopbar @menubutton-click="onMenuButtonClick" />
    <div :class="['layout-mask', { 'layout-mask-active': menuStore.active }]" @click="onMaskClick"></div>
    <div class="layout-content u-px-s">
      <AppMenu />
      <div class="layout-content-slot u-px-l">
        <NuxtPage />
      </div>
    </div>
    <!-- <Toast />
    <Toast position="top-left" group="tl" />
    <Toast position="bottom-left" group="bl" />
    <Toast position="bottom-right" group="br" /> -->
  </div>
</template>
