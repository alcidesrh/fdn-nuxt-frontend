<script setup>
import AppTopbar from './AppTopbar.vue'
import Sidebar from './Sidebar.vue'
import { DomHandler } from '@primevue/core/utils'
import AppConfig from './AppConfig.vue';
import EventBus from './EventBus.vue';

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
    <div>
      <EventBus />
    </div>
    <div id="intersectionObservertarget" class="absolute top-2rem"></div>

    <AppTopbar @menubutton-click="onMenuButtonClick" />

    <Sidebar />

    <div id="layout-content" class="layout-content" :class="[menuStore.mode]">
      <div class="layout-content-slot">
        <NuxtPage />
      </div>
    </div>
    <div :class="['layout-mask', { 'layout-mask-active': menuStore.mode == 'active' }]" @click="onMaskClick"></div>

  </div>
  <app-config></app-config>
</template>
