<template>
    <div class="layout-topbar px-70px" :class="{ dark: ui.darkTheme }">
        <div class="layout-topbar-inner z-50">
            <div class="w-200px h-70px relative flex items-center">
                <BreadCumbCustom />
            </div>

            <div class="layout-topbar-logo-container">
                <NuxtLink :to="{ name: 'inicio' }" class="">
                    <span class="logo-fdn u-text-1 hidden! sm:flex! md:opacity-100">FDN</span>
                </NuxtLink>
            </div>
            <div class="layout-topbar-actions contrast">
                <div class="layout-config-menu">
                    <button type="button" class="layout-topbar-action" @click="ui.toggleDarkMode()">
                        <i :class="['pi', { 'pi-moon': ui.darkTheme, 'pi-sun': !ui.darkTheme }]"></i>
                    </button>
                    <div class="relative">
                        <button @click="hideConfiguration = !hideConfiguration" type="button" class="layout-topbar-action layout-topbar-action-highlight">
                            <i class="pi pi-palette"></i>
                        </button>
                        <Configurator v-if="!hideConfiguration" @hidden="hideConfiguration = true" />
                    </div>
                </div>

                <div class="layout-topbar-menu hidden lg:block">
                    <div class="layout-topbar-menu-content">
                        <button type="button" class="layout-topbar-action">
                            <i class="pi pi-calendar"></i>
                            <span>Calendar</span>
                        </button>
                        <button type="button" class="layout-topbar-action">
                            <i class="pi pi-inbox"></i>
                            <span>Messages</span>
                        </button>
                        <button type="button" class="layout-topbar-action">
                            <i class="pi pi-user"></i>
                            <span>Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="left-0px top-0px topbar-bg h-70px fixed z-10 w-full"></div>
    </div>
</template>
<script setup>
import Configurator from './Configurator.vue';

const ui = useThemeStateStore();
const hideConfiguration = ref(true);

onMounted(async () => {
    const el = document.querySelector('#intersectionObservertarget');
    const observer = new IntersectionObserver(
        ([e]) => {
            const container = document.querySelector('.layout-topbar');
            if (e.intersectionRatio < 1) container.classList.add('layout-topbar-sticky');
            else container.classList.remove('layout-topbar-sticky');
        },
        {
            threshold: 1
        }
    );
    observer.observe(el);
});
</script>
