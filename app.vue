<template>
  <!-- <VitePwaManifest /> -->
  <NuxtLoadingIndicator />

  <div class="layout-wrapper">

    <div id="intersectionObservertarget" class="absolute top-2rem"></div>

    <Topbar />

    <MenuRoot />

    <div id="layout-content" class="layout-content" :class="[menuStore.mode]">
      <div class="bg-surface-contrast-0 u-p-l md:u-p-xl border border-surface-contrast-200  rounded-sm w-full">

        <NuxtPage />

      </div>
    </div>

    <div class="layout-mask animate-fadein" />

    <div>
      <toast-messages />
    </div>

  </div>

  <ScrollTop />
</template>

<script setup lang="ts">
import { appName } from '~/constants'
import { DomHandler } from '~/utils/primevueutils/Utils.js'

useHead({
  title: appName,
})

const menuStore = useMenuStateStore()
const route = useRoute()
const nuxtApp = useNuxtApp();

const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});

watch(() => route, () => {
  // menuStore.setMode('normal');
  // DomHandler.unblockBodyScroll('blocked-scroll');
  // this.$toast.removeAllGroups(); 
})
onBeforeMount(() => {
  const ui = useThemeStateStore()
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
