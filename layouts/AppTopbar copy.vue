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
  <div class="layout-topbar  u-p-s">

    <div class="layout-topbar-menu flex items-center justify-end w-full" :class="topbarMenuClasses">

      <Button text v-for="(e, i) in headerIcon" :key="i" class="layout-topbar-button z-0 !w-2.5rem !h-2.5rem u-ml-m"
        @click="onSettingsClick()">
        <CustomIcon :key="i" :name="e.name" v-bind="e.attr.value" />
      </Button>

      <Divider layout="vertical" class="u-m-l !before:border-l-slate-400" />

      <a href="/logout"
        class="logout-btn z-0 !w-2rem !h-2rem u-mx-s hover:white bg-zinc-50 border border-slate-400 rounded-full flex items-center justify-center"
        @click="onSettingsClick()">

        <CustomIcon name="close" v-bind='{
          strokeWidth: "3",
          theme: "outline",
          strokeLinecap: "square",
          class: "u-mx-s cursor-pointer drop-shadow text-30px logout-btn",
          size: "20",
        }' />
      </a>

    </div>
  </div>
</template>
