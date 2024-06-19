<script setup lang="ts">
import AppMenu from './AppMenu.vue';

const menuStore = useMenuStateStore()

menuStore.menu = menuStore.menu4

</script>

<template>
    <aside class="layout-sidebar" :class="[menuStore.mode]">
        <nav>
            <ol class="layout-menu">
                <AppMenu :mode="menuStore.mode" :menu="menuStore.menu"></AppMenu>
            </ol>
        </nav>
    </aside>
</template>
<style scoped></style>
