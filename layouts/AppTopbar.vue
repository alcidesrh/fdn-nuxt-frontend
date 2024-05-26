<script setup>
import { onBeforeUnmount, onMounted, watch, ref } from 'vue'

const { getIcons } = useIcon()
const headerIcon = getIcons('header-menu')

const {
  unbindOutsideClickListener,
  bindOutsideClickListener,
  topbarMenuClasses,
  onTopBarMenuButton,
  // onSettingsClick,
} = useSidebar()

function onSettingsClick(e) {
  alert(3)
  e.preventDefault();

  document.body.classList.toggle("my-app-dark");
}
onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

onMounted(() => {
  bindOutsideClickListener()
})

</script>

<template>
  <LogoSvg />
  <div class="layout-topbar overflow-hidden bg-white shadow-md z-997 u-p-s">
    <!-- <button class="layout-topbar-menu-button layout-topbar-button p-link" @click="onTopBarMenuButton">
      <i class="pi pi-ellipsis-v" />
    </button> -->

    <div class="layout-topbar-menu flex items-center justify-end w-full" :class="topbarMenuClasses">

      <Button text v-for="(e, i) in headerIcon" :key="i" class="layout-topbar-button z-0 !w-2.5rem !h-2.5rem u-ml-m"
        @click="onSettingsClick()">
        <icon :key="i" :name="e.name" v-bind="e.attr.value" />
      </Button>

      <Divider layout="vertical" class="u-m-l !before:border-l-slate-400" />

      <a href="/logout"
        class="p-link layout-topbar-button logout-btn z-0 !w-2.2rem !h-2.2rem u-mx-s !hover:bg-zinc-300 hover:bg-zinc-500"
        @click="onSettingsClick()">

        <icon name="close" v-bind='{
          strokeWidth: "6",
          theme: "outline",
          strokeLinecap: "square",
          class: "u-mx-s cursor-pointer drop-shadow text-30px logout-btn",
          size: "20",
        }' />
      </a>

    </div>
  </div>
</template>
