<script setup>

import Sidebar from './Sidebar.vue';
import SidebarMini from './SidebarMini.vue';
import SidebarControl from './SidebarControl.vue';

const menuStore = useMenuStateStore()

</script>

<template>
    <SidebarControl />
    <SidebarMini v-if="menuStore.mode == 'mini'" />
    <Sidebar v-else />
    <!-- <aside class="layout-sidebar overflow-hidden u-mr-l  w-80px"
        :class="[menuStore.active == 1 ? 'active' : '', menuStore.mode]">

        <nav>
            <ol v-if="menuStore.mode == 'mini'" class="layout-menu mini  u--text-2  u-py-m!  border! border-slate-200!">
                <AppMiniMenuItem :menu="menuStore.menu" :root="true"></AppMiniMenuItem>
            </ol>
            <ol v-else class="layout-menu">
                <AppMenuItem :menu="menuStore.menu"></AppMenuItem>

            </ol>
        </nav>
    </aside> -->
</template>
<style scoped>
.sidebar-control>button {
    @apply text-slate-400;

    :hover {
        @apply bg-slate-2
    }
}
</style>
