<script setup>
import { computed, ref, watch } from 'vue'
import { usePrimeVue } from 'primevue/config'
import AppTopbar from './AppTopbar.vue'
import { useLayout } from './composables/layout'
import AppMenu from './AppMenu.vue'

const $primevue = usePrimeVue()
const { layoutState, isSidebarActive, layoutConfig } = useLayout()
const outsideClickListener = ref(null)

watch(isSidebarActive, (newVal) => {
  if (newVal)
    bindOutsideClickListener()

  else
    unbindOutsideClickListener()
})

const containerClass = computed(() => {
  return {
    'layout-theme-light': layoutConfig.darkTheme.value === 'light',
    'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
    'layout-overlay': layoutConfig.menuMode.value === 'overlay',
    'layout-static': layoutConfig.menuMode.value === 'static',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive.value,
    'layout-mobile-active': layoutState.staticMenuMobileActive.value,
    'p-input-filled': $primevue.config.inputStyle === 'filled',
    'p-ripple-disabled': $primevue.config.ripple === false,
  }
})

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false
        layoutState.staticMenuMobileActive.value = false
        layoutState.menuHoverActive.value = false
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

    <div class="layout-sidebar z-1 h-full">
      <AppMenu />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
    </div>
  </div>
</template>
