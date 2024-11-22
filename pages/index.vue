<template>

  <main>
    <!-- <VitePwaManifest /> -->
    <NuxtLoadingIndicator />

    <div class="layout-wrapper" :class="{ 'mobil': isMobil }">

      <div id="intersectionObservertarget" class="absolute top-4rem"></div>

      <Topbar />

      <MenuRoot />

      <div id="layout-content" class="layout-content u-p-s md:u-p-l" :class="[menuStore.mode]">
        <div class="content u-p-s md:u-p-xl lg:u-p-5xl lg:u-py-xl">

          <NuxtPage />
          <!-- <router-view></router-view> -->

        </div>
      </div>

      <div @click="menuStore.mode = 'close'" class="layout-mask animate-fadein" :class="{ 'active': mask }" />

      <div>
        <toast-messages />

        <ConfirmDialogCustom />
      </div>
      <ScrollTop />

    </div>

  </main>

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
