<menu-unfold theme="filled" size="24" fill="#333" :strokeWidth="2" />
<script setup lang="ts">
import AppMenu from './AppMenu.vue';
import AppMenuMini from './AppMenuMini.vue';
import { Pin, Close, MenuUnfold } from '@icon-park/vue-next';

const menuStore = useMenuStateStore()

// menuStore.menu = menuStore.menu4

const hover = ref(false)
const hoverFlag = ref(false)
const pinClicked = ref(false)

watch(() => hover.value, (n, o) => {
    if (!n) {
        pinClicked.value = false
    }
    // if (menuStore.pinned) {
    //     return;
    // }
    // if (menuStore.mode != 'mini' && menuStore.mode != 'hover') {
    //     return
    // }
    // if (n) {
    //     temp = menuStore.modeaux
    //     menuStore.modeaux = menuStore.mode
    //     menuStore.mode = 'hover'
    //     hoverFlag.value = true
    // }
    // else {
    //     hoverFlag.value = false
    //     if (menuStore.mode == 'hover') {
    //         menuStore.mode = menuStore.modeaux
    //         menuStore.modeaux = temp
    //     }

    // }
})
watch(() => menuStore.pinned, (n, o) => {
    if (n) {
        menuStore.mode = "normal"
    }
    else {
        pinClicked.value = true
        menuStore.mode = "mini"
    }
})
</script>

<template>

    <Button size="small" @click="menuStore.mode = 'normal'" class="btn-float border-rounded-l-0 menu-sidebar"
        :class="[menuStore.mode]" raised>
        <menu-unfold theme="filled" size="24" :strokeWidth="3" />
    </Button>
    <aside class="layout-sidebar" id="layout-sidebar"
        :class="[menuStore.mode, hover && !pinClicked ? 'hover-flag' : '']" @mouseover="hover = true"
        @mouseleave="hover = false">
        <div class="sidebar-control">
            <pin class="cursor-pointer " theme="two-tone" :strokeWidth="1" size="20" text
                :fill="menuStore.pinned ? ['#94a3b8', '#64748b'] : ['#0f172a', '#f1f5f9']"
                :class="[!menuStore.pinned ? '-rotate-180deg' : '-rotate-90deg ']"
                @click="menuStore.pinned = !menuStore.pinned" />
            <close @click="menuStore.mode = 'close'" class="cursor-pointer " theme="filled" size="18" fill="#64748b"
                :strokeWidth="5" />

        </div>

        <nav class="u-mt-xs menu-large">
            <ol class=" layout-menu">
                <AppMenu :mode="menuStore.mode" :menu="menuStore.menu"></AppMenu>
            </ol>
        </nav>
        <nav class="u-mt-xs menu-small">
            <ol class=" layout-menu">
                <AppMenuMini :mode="menuStore.mode" :menu="menuStore.menu"></AppMenuMini>
            </ol>
        </nav>
    </aside>


</template>
<style scoped></style>
