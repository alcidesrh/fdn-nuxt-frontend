<script setup>
import AppTopbar from './AppTopbar.vue'
import Sidebar from './Sidebar.vue'
import { DomHandler } from '@primevue/core/utils'

const menuStore = useMenuStateStore()
const route = useRoute()

watch(() => route, () => {
  menuStore.setMode('normal');
  DomHandler.unblockBodyScroll('blocked-scroll');
  // this.$toast.removeAllGroups(); 
})

function onMenuButtonClick() {

  menuStore.setMode('active')
  if (menuStore.mode != 'active') {
    DomHandler.unblockBodyScroll('blocked-scroll');
  } else {
    DomHandler.blockBodyScroll('blocked-scroll');
  }
}
function onMaskClick() {
  menuStore.setMode(false)
  DomHandler.unblockBodyScroll('blocked-scroll');
}
</script>
<template>
  <div class="layout-wrapper">
    <AppTopbar @menubutton-click="onMenuButtonClick" />
    <Sidebar />
    <div class="layout-content  u-px-l" :class="menuStore.mode">
      <div class="layout-content-slot">
        <NuxtPage />
      </div>
    </div>
    <div :class="['layout-mask', { 'layout-mask-active': menuStore.mode == 'active' }]" @click="onMaskClick"></div>

    <!-- <Toast />
    <Toast position="top-left" group="tl" />
    <Toast position="bottom-left" group="bl" />
    <Toast position="bottom-right" group="br" /> -->
  </div>
</template>
