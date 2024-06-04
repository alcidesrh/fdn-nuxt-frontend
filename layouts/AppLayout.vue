<script setup>
import { computed, watch, ref } from 'vue';
import AppTopbar from './AppTopbar.vue';
import AppSidebar from './AppSidebar.vue';
import AppConfig from './AppConfig.vue';

const outsideClickListener = ref(null);

const themeState = useThemeStateStore()

// watch(themeState.isSidebarActive, (newVal) => {
//     alert(newVal)

//     if (newVal) {

//         bindOutsideClickListener();
//     } else {
//         unbindOutsideClickListener();
//     }
// });

const containerClass = computed(() => {
    return {
        'layout-theme-light': themeState.layout.darkTheme === 'light',
        'layout-theme-dark': themeState.layout.darkTheme === 'dark',
        'layout-overlay': themeState.layout.menuMode === 'overlay',
        'layout-static': themeState.layout.menuMode === 'static',
        'layout-static-inactive': themeState.layout.staticMenuDesktopInactive && themeState.layout.menuMode === 'static',
        'layout-overlay-active': themeState.layout.overlayMenuActive,
        'layout-mobile-active': themeState.layout.staticMenuMobileActive,
        // 'p-ripple-disabled': themeState.layout.ripple === false
    };
});
const bindOutsideClickListener = () => {

    alert(outsideClickListener.value)
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                themeState.layout.overlayMenuActive = false;
                themeState.layout.staticMenuMobileActive = false;
                themeState.layout.menuHoverActive = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {

    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};




</script>

<template>
    <div class="layout-wrapper bg-slate-100 " :class="containerClass">
        <app-topbar></app-topbar>
        <div class="layout-sidebar">
            <app-sidebar class="z-29 rounded-l"></app-sidebar>
        </div>
        <div class="layout-main-container z-10 p-t-6xl">
            <div class="layout-main u-p-m u-pt-l h-fit">
                <NuxtPage />
            </div>
        </div>
        <app-config></app-config>
        <div class="layout-mask"></div>
    </div>
    <Toast />
</template>
