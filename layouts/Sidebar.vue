<script setup lang="ts">
import AppMenu from './AppMenu.vue';
import AppMenuMini from './AppMenuMini.vue';
import { SortThree, Pushpin, DoubleDown } from '@icon-park/vue-next';
const menuStore = useMenuStateStore()
const hover = ref(false)
const hoverMode = ref(menuStore.mode == 'mini hover')
let prevMode = menuStore.mode == 'close' ? 'normal' : menuStore.mode

watch(() => hover.value, (n) => {
    if (!hoverMode.value)
        return;
    menuStore.mode = n ? 'normal hovermode' : 'mini hover'
})
watch(() => menuStore.mode, (n, p) => {
    prevMode = p
})

</script>

<template>

    <Button size="small" @click="menuStore.mode = prevMode"
        class="btn-float border-rounded-l-0 menu-sidebar bg-slate-700 " :class="{ 'close': menuStore.mode == 'close' }"
        raised>
        <icon name="ph:arrow-fat-lines-right-thin" size="34" />
    </Button>
    <div class="sidebar-control" :class="[menuStore.mode]">
        <div id="controlBtnSidebar">
            <span @click="hoverMode = true; menuStore.mode = 'mini hover'" :class="[hoverMode ? 'active' : 'inactive']">
                <span></span>
                <span>
                    <sort-three theme="outline" size="17" />
                </span>
            </span>
            <span @click="hoverMode = false; menuStore.mode = 'mini'"
                :class="[!hoverMode && menuStore.mode == 'mini' ? 'active' : 'inactive']">
                <span></span>
                <span>
                    <pushpin theme="outline" size="15" />

                </span>
            </span>
            <span @click="hoverMode = false; menuStore.mode = 'normal'"
                :class="[!hoverMode && menuStore.mode == 'normal' ? 'active' : 'inactive']">
                <span></span>
                <span>
                    <pushpin theme="outline" size="15" />

                </span>
            </span>
        </div>
        <div id="controlVisibilityTl">
            <span>
                <icon name="ph:arrow-fat-lines-left-thin" @click="menuStore.mode = 'close'" />
            </span>
            <span>
                <icon name="ph:arrow-fat-lines-down-thin" @click="menuStore.collapse = !menuStore.collapse" :class="{
                    'expand': menuStore.collapse
                }" />

            </span>
        </div>




    </div>
    <aside class="layout-sidebar" id="layout-sidebar" :class="[menuStore.mode, hover ? 'hover' : '']"
        @mouseover="hover = true" @mouseleave="hover = false">

        <nav class="menu-large">
            <ol class=" layout-menu">
                <AppMenu :mode="menuStore.mode" :menu="menuStore.menu"></AppMenu>
            </ol>
        </nav>
        <nav class=" menu-small">
            <ol class=" layout-menu">
                <AppMenuMini :mode="menuStore.mode" :menu="menuStore.menu"></AppMenuMini>
            </ol>
        </nav>
    </aside>
</template>
``````
