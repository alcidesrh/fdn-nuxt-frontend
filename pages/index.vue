<template>
    <main>
        <NuxtLoadingIndicator />
        <div class="layout-wrapper" :class="{ mobil: isMobil }">
            <div id="intersectionObservertarget" class="top-4rem absolute"></div>
            <Topbar />
            <div class="flex h-full w-full">
                <SidebarLeft />
                <div v-if="fdn.isReady" id="layout-content" class="layout-content" :class="[sidebarLeftClass, sidebarRightClass]">
                    <div class="spinner-wraper z-20" :class="{ hidden: !(loading || mloading || gLoading) }">
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="3" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                        <div></div>
                    </div>
                    <div class="content u-p-l md: u-p-xl lg:u-p-5xl lg:u-py-l">
                        <NuxtPage />
                    </div>
                </div>
                <SidebarRight v-if="fdn.isReady" />
            </div>

            <div>
                <toast-messages />

                <ConfirmDialogCustom />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { appName } from '~/constants';

useHead({
    title: appName
});
const ui = useThemeStateStore();
const sidebarLeft = useSidebarStore('sidebarLeft');
const sidebarRight = useSidebarStore('sidebarRight', 'right');
const metadata = useMetadataStore();

const sidebarLeftClass = computed(() => sidebarLeft.position + '-' + sidebarLeft.mode);
const sidebarRightClass = computed(() => sidebarRight.position + '-' + sidebarRight.mode);

onBeforeMount(() => {
    metadata.setApiMetadata();

    const eventSource = new EventSource('http://localhost/.well-known/mercure?topic=error');

    eventSource.onmessage = (event) => {
        msg.emit(JSON.parse(event.data));
    };

    if (ui.darkTheme) {
        ui.toggleDarkMode(true);
    }
    ui.setPreset();
});
import { useGlobalQueryLoading, useGlobalMutationLoading } from '@vue/apollo-composable';
const loading = useGlobalQueryLoading();
const mloading = useGlobalMutationLoading();
watch(
    () => mloading.value,
    (v) => {
        alert(v);
    }
);
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
