<script setup>
import AppMenuItem from './AppMenuItem.vue';

const themeState = useThemeStateStore()
</script>

<template>
    <ul class="layout-menu">
        <template v-for=" (item, i) in themeState.sidebar.menu" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-else-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>
