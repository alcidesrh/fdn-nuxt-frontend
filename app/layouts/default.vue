<template>
	<main>
		<NuxtLoadingIndicator />
		<DynamicDialog />

		<div class="layout-wrapper" :class="{ mobil: isMobil }">
			<Topbar v-once />
			<div class="h-full w-full flex">
				<SidebarLeft v-once />
				<div id="layout-content" class="layout-content" :class="[sidebarLeftClass, sidebarRightClass]">
					<div class="content u-p-l">
						<slot />
					</div>
				</div>
			</div>
			<SidebarRight v-once />
		</div>

		<div>
			<toast-messages />

			<ConfirmDialogCustom />
		</div>
	</main>
</template>
<script setup lang="ts">
import DynamicDialog from 'primevue/dynamicdialog';

const ui = useThemeStateStore();
const sidebarLeft = useSidebarStore("sidebarLeft");
const sidebarRight = useSidebarStore("sidebarRight", "right");
const store = useUserSessionStore();
const { user: userFromStore } = store;
user.value = userFromStore as User;
const sidebarLeftClass = computed(
	() => `${sidebarLeft.position}-${sidebarLeft.mode}`
);
const sidebarRightClass = computed(
	() => `${sidebarRight.position}-${sidebarRight.mode}`
);


onBeforeMount(() => {
	const eventSource = new EventSource(
		"http://localhost/.well-known/mercure?topic=error"
	);

	eventSource.onmessage = event => {
		msg.emit(JSON.parse(event.data));
	};

	if (ui.darkTheme) {
		ui.toggleDarkMode(true);
	}
	ui.setPreset();
});


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
