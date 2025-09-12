<script setup>
import Configurator from './Configurator.vue'

const ui = useThemeStateStore()
const hideConfiguration = ref(true)

function logout() {
  $fetch('/logout', {
    ...API_DEFAULT_OPTIONS,
  })
    .then((resp) => {
      const store = useUserSessionStore()
      store.$reset()
      user.value = null
      delete API_DEFAULT_OPTIONS.headers.Authorization
      navigateTo({ name: 'Login' })
    })
    .catch((err) => {
      console.error(err, 6767)

      const store = useUserSessionStore()
      store.$reset()
      user.value = null
      delete API_DEFAULT_OPTIONS.headers.Authorization
      navigateTo({ name: 'Login' })
    })
    .finally(() => {})
}

onMounted(async () => {
  const el = document.querySelector('#intersectionObservertarget')
  const observer = new IntersectionObserver(
    ([e]) => {
      const container = document.querySelector('.layout-topbar')
      if (e.intersectionRatio < 1)
        container.classList.add('layout-topbar-sticky')
      else container.classList.remove('layout-topbar-sticky')
    },
    {
      threshold: 1,
    },
  )
  observer.observe(el)
})
</script>

<template>
  <div class="layout-topbar" :class="{ dark: ui.darkTheme }">
    <div class="layout-topbar-inner z-2">
      <clock />
      <BreadCumbCustom />
      <div class="layout-topbar-actions">
        <button type="button" class="layout-topbar-action">
          <i class="pi pi-calendar" />
        </button>
        <button type="button" class="layout-topbar-action">
          <i class="pi pi-inbox" />
        </button>
        <button
          type="button"
          class="layout-topbar-action"
          @click="ui.toggleDarkMode()"
        >
          <i
            class="pi" :class="[
              {
                'pi-moon': ui.darkTheme,
                'pi-sun': !ui.darkTheme,
              },
            ]"
          />
        </button>
        <div class="relative">
          <button
            type="button"
            class="layout-topbar-action"
            @click="hideConfiguration = !hideConfiguration"
          >
            <i class="pi pi-palette" />
          </button>
          <Configurator
            v-if="!hideConfiguration"
            @hidden="hideConfiguration = true"
          />
        </div>
        <!-- <div @click="logout" > -->
        <Icon
          class="cursor-pointer"
          name="icon-park-outline:logout"
          mode="svg"
          size="24"
          @click="logout"
        />
        <!-- </div> -->
      </div>
    </div>
    <!-- <a href="/logout" class="btn-logout"> -->
    <!-- <i class="pi pi-times-circle"></i> -->
    <!-- <Icon name="icon-park-outline:logout" mode="svg" size="24" /> -->
    <!-- </a> -->
    <div class="left-0px top-0px topbar-bg h-70px z-1 fixed w-full" />
  </div>
</template>
