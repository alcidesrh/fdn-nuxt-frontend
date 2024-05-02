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
    <div class="layout-wrapper bg-slate-100 h-2000px" :class="containerClass">

        <app-topbar class="bg-slate-700 z-999"></app-topbar>

        <div class="layout-sidebar z-998">
            <div
                class="bg-transparent sidebar-btn absolute top-50% -mt-44px z-999 grid w-full max-w-200px u-pl-s gap-6 left-100% -ml-46px">

                <Button @click="siderbar_toggle('vertical')"
                    class="bg-slate-50/50 w-fit  border border-slate-300 hover:bg-slate-200/60   rounded-full ">
                    <CircleDoubleLeftIcon
                        :class="{ '-rotate-90': !themeState.sidebar.v_opened, 'rotate-90': themeState.sidebar.v_opened }" />
                </Button>

                <Button @click="siderbar_toggle"
                    class="bg-slate-50/50 w-fit  border border-slate-300 hover:bg-slate-200/60 rounded-full ">
                    <CircleDoubleLeftIcon
                        :class="{ 'rotate-0': !themeState.layout.staticMenuDesktopInactive, 'rotate-180': themeState.layout.staticMenuDesktopInactive }" />
                </Button>
            </div>
            <app-sidebar class="z-29 rounded-l"></app-sidebar>

        </div>
        <!-- </div> -->
        <div class="layout-main-container z-10">
            <div class="layout-main u-p-m pt-40px flex justify-center h-fit">
                <div class="container u-p-m bg-white shadows-lg border border-slate-3">
                    <NuxtPage />
                    <!-- <router-view></router-view> -->
                </div>
            </div>
        </div>
        <app-config></app-config>
        <div class="layout-mask"></div>
    </div>
    <Toast />
</template>
