<script setup>
import { computed, watch, ref } from 'vue';
import AppTopbar from './AppTopbar.vue';
import AppSidebar from './AppSidebar.vue';
import AppConfig from './AppConfig.vue';


const outsideClickListener = ref(null);

const themeState = useThemeStateStore()

watch(themeState.isSidebarActive, (newVal) => {
    alert(newVal)

    if (newVal) {

        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

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
const siderbar_toggle = (direction = 'horizontal') => {
    if (direction == 'vertical') {
        themeState.sidebar.v_opened = !themeState.sidebar.v_opened;
        themeState.onMenuToggleVertical()
    }
    else {
        themeState.sidebar.h_opened = !themeState.sidebar.h_opened
        themeState.onMenuToggle()
    }
}

</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar></app-topbar>
        <!-- <div> -->

        <div class="layout-sidebar">

            <app-sidebar class="z-2"></app-sidebar>
            <div class="menu-btn absolute top-50% z-5 -mt-37px -right-18px grid gap-2 z-1">
                <Button @click="siderbar_toggle">
                    <CircleDoubleLeftIcon direction="horizontal" :class="{ 'rotate-180': !themeState.sidebar.h_opened }"
                        strokeWidth="none" class="stroke-2 !text-neutral-800 text-22px"
                        style="transition: transform 0.2s;" />
                </Button>
                <Button @click="siderbar_toggle('vertical')">
                    <CircleDoubleLeftIcon direction="vertical" strokeWidth="none"
                        class="stroke-2 !text-neutral-800  text-21px" style="transition: transform 0.2s;" />
                </Button>
            </div>
        </div>
        <!-- </div> -->
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view></router-view>
            </div>
        </div>
        <app-config></app-config>
        <div class="layout-mask"></div>
    </div>
    <Toast />
</template>

<style lang="scss" scoped></style>
