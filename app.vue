<template>
  <!-- <VitePwaManifest /> -->
  <NuxtLoadingIndicator />

  <div class="layout-wrapper" :class="{ 'mobil': isMobil }">

    <div id="intersectionObservertarget" class="absolute top-2rem"></div>

    <Topbar />

    <MenuRoot />

    <div id="layout-content" class="layout-content " :class="[menuStore.mode]">
      <div class="bg-surface-contrast-0 u-p-l md:u-px-xl rounded-sm w-full relative max-w-full">

        <NuxtPage />

      </div>
    </div>

    <div @click="menuStore.mode = 'close'" class="layout-mask animate-fadein" :class="{ 'active': mask }" />

    <div>
      <toast-messages />
    </div>

  </div>

  <ScrollTop />
</template>

<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
const ui = useThemeStateStore()
const menuStore = useMenuStateStore()

const mask = computed(() => menuStore.mode == 'normal' && isMobil)

onBeforeMount(() => {

  if (ui.darkTheme) {
    ui.toggleDarkMode(true)
  }
  ui.setPreset()
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
