<script setup>
import { onBeforeUnmount, onMounted } from 'vue'


const {
  unbindOutsideClickListener,
  bindOutsideClickListener,
  topbarMenuClasses,
  onTopBarMenuButton,
  onSettingsClick,
} = useSidebar()


onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

onMounted(() => {
  bindOutsideClickListener()
})

</script>

<template>
  <div class="layout-topbar text-slate-800 shadow" >

    <div id="target" class="relative z-20 h-full w-full flex items-center">
      <div
        class="to-remove absolute bottom-1px z-2 hidden h-40px w-250px overflow-hidden border border-3 border-slate-300 rounded-bl-15px rounded-tl-70px rounded-tr-20px"
      >
        <img src="/logo_actual.png" class="absolute left-30px top-12px z-12 h-22px w-100px">

      </div>
      <router-link id="logo-wrap" to="/" class="layout-topbar-logo fixed">
        <Logo id="logo" />
      </router-link>
    </div>

    <button class="layout-topbar-menu-button layout-topbar-button p-link" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v" />
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button class="p-link layout-topbar-button z-0" @click="onTopBarMenuButton()">
        <i class="pi pi-calendar text-slate-700" />
        <span>Calendar</span>
      </button>
      <button class="p-link layout-topbar-button z-0" @click="onTopBarMenuButton()">
        <UserIcon />
        <span>Profile</span>
      </button>
      <button class="p-link layout-topbar-button z-0" @click="onSettingsClick()">
        <i class="pi pi-cog text-slate-700" />
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>
