<script setup lang="ts"></script>

<script setup lang="ts">
const ui = useThemeStateStore()
const sidebarLeft = useSidebarStore('sidebarLeft')
const sidebarRight = useSidebarStore('sidebarRight', 'right')

const sidebarLeftClass = computed(
  () => `${sidebarLeft.position}-${sidebarLeft.mode}`,
)
const sidebarRightClass = computed(
  () => `${sidebarRight.position}-${sidebarRight.mode}`,
)

// onBeforeMount(() => {
// 	const eventSource = new EventSource(
// 		"http://localhost/.well-known/mercure?topic=error"
// 	);

// 	eventSource.onmessage = event => {
// 		msg.emit(JSON.parse(event.data));
// 	};

// 	if (ui.darkTheme) {
// 		ui.toggleDarkMode(true);
// 	}
// 	ui.setPreset();
// });
</script>

<template>
  <main>
    <NuxtLoadingIndicator />
    <div class="layout-wrapper" :class="{ mobil: isMobil }">
      <div id="intersectionObservertarget" class="absolute" />
      <Topbar />
      <div class="flex h-full w-full">
        <SidebarLeft v-if="fdn.isReady" />
        <div
          v-if="fdn.isReady"
          id="layout-content"
          class="layout-content"
          :class="[sidebarLeftClass, sidebarRightClass]"
        >
          <div class="content u-p-l">
            <slot />
          </div>
        </div>
      </div>
      <SidebarRight v-if="fdn.isReady" />
    </div>

    <div>
      <toast-messages />

      <ConfirmDialogCustom />
    </div>
  </main>
</template>

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
