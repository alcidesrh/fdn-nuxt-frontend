<script setup lang="ts">
// import LocalStoreManagament from '~/components/LocalStoreManagament.vue'

// onMounted(() => useDialog().open(LocalStoreManagament))

interface Props {
  position?: string
  classes?: string
  storeId: string
}
const { position = 'left', classes = '', storeId } = defineProps<Props>()

const sidebar = ref()
const sidebarStore = useSidebarStore(storeId, position)
const modes = sidebarStore.modeStates
const hoverFloatButton = ref(false)
const hoverSidebar = ref(false)
const hoverScreenEdge = ref(false)
const hoverMode = ref(sidebarStore.mode == modes.onhover)
let prevMode = sidebarStore.mode
const openDialbtn = ref(false)
const { start, isPending, stop } = useTimeoutFn(
  () => {
    sidebarStore.mode = modes.close
  },
  300,
  { immediate: false },
)

watch(
  () => hoverFloatButton.value,
  (n) => {
    if (!n && sidebarStore.mode == modes.onhover) {
      start()
    }
    else if (n && sidebarStore.mode == modes.close) {
      if (isPending.value) {
        stop()
      }
      sidebarStore.mode = modes.onhover
    }
  },
)
watch(
  () => hoverScreenEdge.value,
  (n) => {
    if (n && sidebarStore.mode == modes.close) {
      sidebarStore.mode = modes.onhover
    }
  },
)
watch(
  () => hoverSidebar.value,
  (n) => {
    if (sidebarStore.mode == modes.onhover) {
      if (!n) {
        start()
      }
      else if (n) {
        if (isPending.value) {
          stop()
        }
      }
    }
  },
)

watch(
  () => sidebarStore.mode,
  (n, p) => {
    if (n == modes.close) {
      hoverMode.value = true
    }
    else {
      hoverMode.value = false
    }

    prevMode = p
  },
)

const firstCloseCache = ref(sidebarStore.mode == 'close')
watch(
  () => sidebarStore.mode,
  () => {
    firstCloseCache.value = false
  },
  { once: true },
)

function toggleSidebar() {
  if (sidebarStore.mode != modes.close) {
    prevMode = sidebarStore.mode
    sidebarStore.mode = modes.close
  }
  else if (
    sidebarStore.mode == modes.close
    && (!prevMode || prevMode == modes.close)
  ) {
    sidebarStore.mode = modes.normal
    prevMode = modes.normal
  }
  else {
    sidebarStore.mode = prevMode
  }
}

const items = ref([
  {
    label: 'Add',
    icon: 'pi pi-pencil',
    command: () => {
      toast.add({
        severity: 'info',
        summary: 'Add',
        detail: 'Data Added',
        life: 3000,
      })
    },
  },
  {
    label: 'Update',
    icon: 'pi pi-refresh',
    command: () => {
      toast.add({
        severity: 'success',
        summary: 'Update',
        detail: 'Data Updated',
        life: 3000,
      })
    },
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      toast.add({
        severity: 'error',
        summary: 'Delete',
        detail: 'Data Deleted',
        life: 3000,
      })
    },
  },
  {
    label: 'Upload',
    icon: 'pi pi-upload',
    command: () => {
      router.push('/fileupload')
    },
  },
  {
    label: 'Limpiar cache',
    icon: 'pi pi-external-link',
    command: () => {
      useDialog().open(LocalStoreManagament)
    },
  },
])
</script>
<template>
  <div>
    <div class="toggle-sidebar" :class="[
      sidebarStore.position,
      sidebarStore.mode,
      openDialbtn ? 'open-dialbtn' : '',
    ]" severity="contrast" variant="outlined" raised @mouseover="hoverFloatButton = true"
      @mouseleave="hoverFloatButton = false">
      <SpeedDial :model="items" :radius="120" type="quarter-circle" :direction="sidebarStore.position == 'left' ? 'down-right' : 'down-left'
        " :tooltip-options="{ position: 'left' }" @show="openDialbtn = true" @hide="openDialbtn = false" class="gap-0">
        <template #button="{ toggleCallback }">
          <div data-pc-name="pcbutton" class="menu-btn" @click="toggleCallback">
            <icon name="icon-park-outline:all-application" mode="svg" />

          </div>
        </template>
        <template #item="{ item, toggleCallback }">
          <div v-tooltip.left="item.label" text raised rounded class="menu-btn item" @click="toggleCallback">
            <icon :name="sidebarStore.position == 'left'
              ? `icon-park-outline:all-application`
              : `material-symbols:person-celebrate`
              " mode="svg" />
          </div>
        </template>
      </SpeedDial>
    </div>
    <div v-if="!firstCloseCache" ref="sidebar" class="wrap-sidebar"
      :class="[sidebarStore.position, sidebarStore.mode, classes]" @mouseover="hoverSidebar = true"
      @mouseleave="hoverSidebar = false">
      <div class="sidebar-control" :class="[sidebarStore.position, sidebarStore.mode]">
        <!-- <close /> -->

        <div :class="[sidebarStore.position, sidebarStore.mode]">
          <!-- <div :class="{
            selected:
              hoverMode && sidebarStore.mode == modes.close,
          }" @click="toggleSidebar()">
            <div></div>
            <div></div>
          </div> -->

          <div :class="{
            selected:
              !hoverMode && sidebarStore.mode == modes.small,
          }" @click="sidebarStore.mode = modes.small">
          </div>

          <div :class="{
            selected:
              !hoverMode && sidebarStore.mode == modes.normal,
          }" @click="sidebarStore.mode = modes.normal">
          </div>

        </div>
        <Icon name="icon-park-outline:left-two" mode="svg" class="z-50 cursor-pointer" :class="{
          selected: hoverMode &&
            sidebarStore.mode == modes.close,
        }" @click="toggleSidebar()" />
      </div>
      <!-- <divider class="m-auto w-80% my-15px mb-30px" /> -->
      <aside id="layout-sidebar" ref="sidebar" class="layout-sidebar" :class="[sidebarStore.mode]">
        <close v-if="isMobil" @close="sidebarStore.mode = modes.close" />

        <slot name="content" :data="sidebarStore" />
      </aside>
    </div>
    <div class="toggle-sidebar-lateral" :class="[sidebarStore.position, sidebarStore.mode]"
      @mouseover="hoverScreenEdge = true" @mouseleave="hoverScreenEdge = false" />
  </div>
</template>

<style src="~/assets/layout/admin/sidebar.css" />
