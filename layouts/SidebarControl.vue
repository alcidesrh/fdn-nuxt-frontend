<script setup lang="ts">

const menuStore = useMenuStateStore()

const iconProps = {
  theme: "line",
  size: "20",
  strokeWidth: "4",
}
</script>
<style scoped>
.sidebar-control-btn {
  transition-property: left;
  transition-duration: .5s;
  @apply -left-10px fixed grid top-50% -mt-74px z-999 bg-white border border-slate-500 border-l-0 opacity-40;

  &>div.p-divider {
    @apply my-0 ! py-0 ! before:border-slate-500;
  }

  &:hover {
    @apply opacity-100 left-0 shadow-lg border-slate-300;
    background-color: var(--surface-50);

    &>div:not(.p-divider) {
      @apply u-pr-xs;

      &>>>span>svg>path {
        @apply stroke-slate-600
      }
    }

    &>div.p-divider {
      @apply before:border-slate-300
    }
  }

  &>div:not(.p-divider) {
    @apply u-p-xs u-pr-6xs;

    &:hover {
      @apply cursor-pointer;

      &>>>span>svg {
        scale: 1.2;
      }
    }

    &>span>>>svg>path {
      @apply stroke-slate-500
    }
  }

  &:has(+ .layout-sidebar.mini) {
    left: 50px;
    z-index: 1;

    &:hover {
      @apply opacity-100 left-70px shadow-lg border-slate-300;
    }
  }

}
</style>

<template>

  <div class="sidebar-control-btn ">
    <div @click="menuStore.collapse = !menuStore.collapse">
      <CustomIcon name="sort-three" v-bind="iconProps" />
    </div>
    <divider class="my-0 ! py-0 ! before:border-slate-900" />
    <div @click="menuStore.setMode('mini')">
      <CustomIcon name="freeze-column" v-bind="iconProps" />
    </div>
    <divider />
    <div @click="menuStore.setMode('close')" class="mode-desktop">
      <CustomIcon name="sort-three" class="rotate-90" v-bind="iconProps" />
    </div>
    <div @click="menuStore.active = !menuStore.active" class="mode-mobile hidden">
      <CustomIcon name="sort-three" class="rotate-90 " v-bind="iconProps" />
    </div>
  </div>

</template>
