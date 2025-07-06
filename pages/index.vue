<template>
    <main>
        <!-- <VitePwaManifest /> -->
        <NuxtLoadingIndicator />
        <div class="layout-wrapper" :class="{ mobil: isMobil }">
            <div id="intersectionObservertarget" class="absolute top-4rem"></div>
            <Topbar />
            <MenuRoot />
            <div v-if="fdn.isReady" id="layout-content" class="layout-content u-p-s relative" :class="[menuStore.mode]">
                <div class="spinner-wraper z-20" :class="{ hidden: !(loading || mloading || gLoading) }">
                    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="3" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                    <div></div>
                </div>
                <div class="content u-p-l md:u-p-xl lg:u-p-5xl lg:u-py-l z-10">
                    <NuxtPage />
                </div>
            </div>

            <div @click="menuStore.mode = 'close'" class="layout-mask animate-fadein" :class="{ active: mask }" />

            <div>
                <toast-messages />

                <ConfirmDialogCustom />
            </div>
        </div>
        <SettingDrawer v-if="fdn.isReady" />
    </main>
</template>

<script setup lang="ts">
import SettingDrawer from '~/pages/admin/SettingDrawer.vue';
import { appName } from '~/constants';

useHead({
    title: appName
});
const ui = useThemeStateStore();
const menuStore = useMenuStateStore();
const metadata = useMetadataStore();

const mask = computed(() => menuStore.mode == 'normal' && isMobil);

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
