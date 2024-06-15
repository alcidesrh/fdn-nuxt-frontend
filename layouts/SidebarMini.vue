<script setup lang="ts">
import AppMiniMenuItem from './AppMiniMenuItem.vue';
const menuStore = useMenuStateStore()
</script>

<template>
  <aside class="layout-sidebar mini overflow-hidden u-mr-l  w-80px ">

    <nav>
      <ol class="layout-menu mini  u--text-3  u-py-m!  border! border-slate-200!">
        <AppMiniMenuItem :menu="menuStore.menu" :root="true"></AppMiniMenuItem>
      </ol>
    </nav>
  </aside>
</template>
