<script setup>
import { onBeforeUnmount, onMounted, watch, ref } from 'vue'

const { getIcons } = useIcon()
const headerIcon = getIcons('header-menu')
const hover = ref(false)

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

function hoverMenu(i, event) {
  console.log(i, event);
  if (event == 'in') {
    attr[i].value.fill = ['#e2e8f0', '#94a3b8'];
  }
  else {
    attr[i].value.fill = ['#475569', '#f1f5f9'];

  }
}

const data = { size: "29", strokeWidth: "2", theme: "two-tone", fill: ['#475569', '#f1f5f9'], strokeLinecap: "square", class: 'u-mx-xs cursor-pointer drop-shadow' }

const attr = Array.from({ length: 4 }, () => { const { cloned } = useCloned(ref(data)); return cloned; })
</script>

<template>
  <div class="layout-topbar text-slate-800 shadow u-px-m">

    <div id="target" class="relative z-20 h-full w-full flex items-center">
      <div
        class="to-remove absolute bottom-1px z-2 hidden h-40px w-250px overflow-hidden border border-3 border-slate-300 rounded-bl-15px rounded-tl-70px rounded-tr-20px">
        <img src="/logo_actual.png" class="absolute left-30px top-12px z-12 h-22px w-100px">

      </div>
      <router-link id="logo-wrap" to="/" class="layout-topbar-logo fixed">
        <Logo />
      </router-link>
    </div>

    <button class="layout-topbar-menu-button layout-topbar-button p-link" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v" />
    </button>

    <div class="layout-topbar-menu flex items-center" :class="topbarMenuClasses">
      <!-- <button class="p-link layout-topbar-button z-0" @click="onTopBarMenuButton()">
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
      </button> -->
      <icon v-for="(e, i) in headerIcon" :key="i" :name="e.name" :fill="['#475569', '#f1f5f9']" v-bind="e.attr.value" />


      <!-- <component v-for="(e, i) in headerIcon" :key="i" :is="`icon-${e.name}`" v-bind="e.attr.value"  @mouseover="hoverMenu(i, 'in')" @mouseleave="hoverMenu(i, 'leave')"></component> -->

      <Divider layout="vertical" type="dashed" class="u-mr-s ml-0 before:border-slate-400/25" />

      <a href="/logout" rounded class="u-p-4xs flex justify-center items-center ">

        <icon-error v-bind="{
          size: '23', strokeWidth: '0', theme: 'two-tone', fill: ['#e2e8f0', '#64748b'],
          strokeLinecap: 'square', class: 'rounded-full cursor-pointer drop-shadow'
        }" />

      </a>
    </div>
  </div>
</template>
