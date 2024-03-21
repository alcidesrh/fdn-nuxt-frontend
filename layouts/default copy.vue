<script setup>
import { computed, ref, watch } from 'vue'
import { usePrimeVue } from 'primevue/config'
import AppTopbar from './AppTopbar.vue'

import AppMenu from './AppMenu.vue'

const themeState = useThemeStateStore()
const $primevue = usePrimeVue()
const outsideClickListener = ref(null)

watch(themeState.isSidebarActive, (newVal) => {
  if (newVal)
    bindOutsideClickListener()

  else
    unbindOutsideClickListener()
})

const siderbar_toggle = (direction = 'horizontal') => {
  if (direction == 'vertical') {
    themeState.sidebar.v_opened = !themeState.sidebar.v_opened;
    themeState.onMenuToggleVertical()
  }
  else {
    themeState.sidebar.h_opened = !themeState.sidebar.h_opened
    themeState.onMenuToggle()
  }
  // const { menu } = useMenu();
  // if (!equals(toRaw(themeState.sidebar.menu), menu)) {
  //     themeState.sidebar.menu = menu
  //     console.log(themeState.sidebar.menu);
  // }
}

const containerClass = computed(() => {
  return {
    'layout-theme-light': themeState.layout.darkTheme === 'light',
    'layout-theme-dark': themeState.layout.darkTheme === 'dark',
    'layout-overlay': themeState.layout.menuMode === 'overlay',
    'layout-static': themeState.layout.menuMode === 'static',
    'layout-static-inactive': themeState.layout.staticMenuDesktopInactive && themeState.layout.menuMode === 'static',
    'layout-overlay-active': themeState.layout.overlayMenuActive,
    'layout-mobile-active': themeState.layout.staticMenuMobileActive,
    'p-input-filled': $primevue.config.inputStyle === 'filled',
    'p-ripple-disabled': $primevue.config.ripple === false,
  }
})

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        themeState.layout.overlayMenuActive = false
        themeState.layout.staticMenuMobileActive = false
        themeState.layout.menuHoverActive = false
      }
    }

    document.addEventListener('click', outsideClickListener.value)
  }
}

function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener)
    outsideClickListener.value = null
  }
}

function isOutsideClicked(event) {
  const sidebarEl = document.querySelector('.layout-sidebar')
  const topbarEl = document.querySelector('.layout-menu-button')

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target))
}
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <AppTopbar />

    <!-- <div> -->
    <ButtonGroup class="absolute top-50% z-2 -mt-37px left-0 grid gap-1 z-9999">
      <Button @click="siderbar_toggle" rounded severity="success" class="border border-slate-500 bg-slate-50">
        <template #icon>
          <CircleDoubleLeftIcon direction="horizontal" :class="{ 'rotate-180': !themeState.sidebar.h_opened }"
            strokeWidth="none" class="stroke-4 !text-slate-500  text-25px" style="transition: transform 0.2s;" />
        </template>
      </Button>
      <Button @click="siderbar_toggle('vertical')" severity="success" rounded class="border border-slate-500 bg-slate-50">
        <template #icon>
          <CircleDoubleLeftIcon direction="vertical" strokeWidth="none" class="stroke-4 !text-slate-500  text-25px"
            style="transition: transform 0.2s;" />
        </template>
      </Button>
    </ButtonGroup>
    <div class="layout-sidebar">
      <AppMenu />
    </div>

    <!-- </div> -->

    <div class="layout-main-container u-p-s md:u-p-lg ">
      <div class="layout-main">
        <router-view />
      </div>
    </div>
  </div>
</template>
