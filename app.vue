<template>
    <NuxtLoadingIndicator />

    <NuxtLayout>
        <NuxtPage v-if="fdn.isReady" />
    </NuxtLayout>
</template>
<script setup lang="ts">
import { User } from './types/user';

const store = useUserSessionStore();
const { user: userFromStore } = store;
user.value = userFromStore as User;

const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
    duration: 2000,
    throttle: 200,
    // This is how progress is calculated by default
    estimatedProgress: (duration, elapsed) => (2 / Math.PI) * 100 * Math.atan(((elapsed / duration) * 100) / 50)
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
    const metadata = useMetadataStore();
    metadata.setApiMetadata();

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
