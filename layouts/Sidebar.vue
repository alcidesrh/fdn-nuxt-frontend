<script setup lang="ts">
import AppMenuItem from './AppMenuItem.vue';

const menuStore = useMenuStateStore()
</script>

<template>
  <aside class="layout-sidebar" :class="[menuStore.active ? 'active' : '', menuStore.mode]">
    <nav>
      <ol class="layout-menu">
        <AppMenuItem :menu="menuStore.menu"></AppMenuItem>
      </ol>
    </nav>
  </aside>
</template>
