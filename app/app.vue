<script setup lang="ts">
import type { User } from "./types/user";
import { MutationType } from 'pinia'

// const store = useUserSessionStore();
const api = useMetadataStore()

// api.$subscribe((mutation, state) => {
// 	// mutation.type // 'direct' | 'patch object' | 'patch function'
// 	// same as cartStore.$id
// 	// mutation.storeId // 'cart'
// 	// only available with mutation.type === 'patch object'
// 	// mutation.payload // patch object passed to cartStore.$patch()
// 	// persist the whole state to the local storage whenever it changes
// 	fdn.value.mutations = state.mutations
// 	fdn.value.queries = state.queries
// 	fdn.value.resources = state.resources
// 	fdn.value.payload = state.payload
// 	fdn.value.input = state.input
// })

// const { user: userFromStore } = store;
// user.value = userFromStore as User;

const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
	duration: 2000,
	throttle: 200,
	// This is how progress is calculated by default
	estimatedProgress: (duration, elapsed) =>
		(2 / Math.PI) * 100 * Math.atan(((elapsed / duration) * 100) / 50)
});
start({ force: true });
watch(
	() => fdn.value.isReady,
	() => {
		// finish();
	}
);

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

<template>
	<!-- <Stats /> -->
	<NuxtLoadingIndicator />

	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
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
