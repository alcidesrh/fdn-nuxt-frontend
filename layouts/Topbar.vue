<template>
  <div class="layout-topbar" :class="{ 'dark': ui.darkTheme }">
    <div class="layout-topbar-inner z-50">
      <div class="layout-topbar-logo-container relative w-200px h-70px flex items-center">
        <NuxtLink to="/" class="layout-topbar-logo z-10">
          <LogoSvg />
        </NuxtLink>
      </div>

      <div class="layout-topbar-actions">
        <div class="layout-config-menu">
          <button type="button" class="layout-topbar-action" @click="ui.toggleDarkMode()">
            <i :class="['pi', { 'pi-moon': ui.darkTheme, 'pi-sun': !ui.darkTheme }]"></i>
          </button>
          <div class="relative">
            <button
              v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
              type="button" class="layout-topbar-action layout-topbar-action-highlight">
              <i class="pi pi-palette"></i>
            </button>
            <Configurator />
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
    <div class="absolute h-full w-full bg-transparent left-0px top-0 z-10 topbar-bg"></div>

  </div>
</template>
<script setup>
import Configurator from './Configurator.vue'

const ui = useThemeStateStore()

onMounted(async () => {
  const el = document.querySelector("#intersectionObservertarget")
  const observer = new IntersectionObserver(
    ([e]) => {
      const container = document.querySelector('.layout-topbar')
      if (e.intersectionRatio < 1) container.classList.add('layout-topbar-sticky');
      else container.classList.remove('layout-topbar-sticky');
    },
    {
      threshold: 1
    }
  );
  observer.observe(el);
})
</script>
