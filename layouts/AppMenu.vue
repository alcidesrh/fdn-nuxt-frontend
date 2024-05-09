<script setup>
import AppMenuItem from './AppMenuItem.vue';
import { equals } from 'ramda'

const themeState = useThemeStateStore()

const { menu } = useMenu();
// if (!equals(toRaw(themeState.sidebar.menu), menu)) {
//     themeState.sidebar.menu = menu

// }

// console.log(themeState.sidebar.menu, themeState.layout.staticMenuDesktopInactive);

</script>

<template>
    <ul class="layout-menu">
        <template v-for=" (item, i) in themeState.sidebar.menu" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"
                :array-length="themeState.sidebar.menu.length"></app-menu-item>
            <li v-else-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>
