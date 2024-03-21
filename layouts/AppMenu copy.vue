<script setup>
import AppMenuItem from './AppMenuItem.vue';
import { ref, watch, toRaw } from 'vue';

const open = ref(true);

const themeState = useThemeStateStore()



</script>
<template>
    <ul class="layout-menu  z-1">
        <template v-for=" (item, i) in themeState.sidebar.menu" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i" :open-root="open"></app-menu-item>
        </template>
    </ul>
</template>
