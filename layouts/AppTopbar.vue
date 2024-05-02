<script setup>
import { onBeforeUnmount, onMounted, watch, ref } from 'vue'

const { getIcons } = useIcon()
const headerIcon = getIcons('header-menu')

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
  <div class="layout-topbar overflow-hidden ">

    <LogoSvg />

    <button class="layout-topbar-menu-button layout-topbar-button p-link" @click="onTopBarMenuButton">
      <i class="pi pi-ellipsis-v" />
    </button>

    <div class="layout-topbar-menu flex items-center" :class="topbarMenuClasses">

      <button v-for="(e, i) in headerIcon" :key="i" class="p-link layout-topbar-button z-0 !w-2.5rem !h-2.5rem u-mx-5xs"
        @click="onSettingsClick()">
        <icon :key="i" :name="e.name" v-bind="e.attr.value" />
      </button>
      <Divider layout="vertical" type="dashed" class="before:border-slate-400 py-0" />

      <button
        class="p-link layout-topbar-button logout-btn z-0 !w-2.2rem !h-2.2rem bg-slate-200 u-mx-s !hover:bg-slate-300 hover:bg-slate-500"
        @click="onSettingsClick()">

        <icon name="close" v-bind='{
          strokeWidth: "6",
          theme: "outline",
          strokeLinecap: "square",
          class: "u-mx-s cursor-pointer drop-shadow text-30px logout-btn",
          size: "20",
        }' />
      </button>

    </div>
  </div>
</template>
