<template>
	<!-- <Stats /> -->
	<div>
		<NuxtLoadingIndicator />
		<DynamicDialog />
		<ConfirmDialogCustom />
		<ToastMessages />

		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>

</template>

<script setup lang="ts">

import type { User } from "./types/user";
import DynamicDialog from 'primevue/dynamicdialog';

const store = useUserSessionStore();
const { user: userFromStore } = store;
user.value = userFromStore as User;

const eventSource = new EventSource(
	"http://localhost/.well-known/mercure?topic=error"
);

eventSource.onmessage = event => {
	msg.emit(JSON.parse(event.data));
};

onBeforeMount(() => {
	const ui = useThemeStateStore();

	if (ui.darkTheme) {
		ui.toggleDarkMode(true);
	}
	ui.setPreset();

	const error = useError();

	if (error.value) {
		alert("Nuxt error:", error.value);
	}
});
</script>
<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
