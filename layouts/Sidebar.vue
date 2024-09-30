<script setup lang="ts">
import MenuLarge from './MenuLarge.vue';
import MenuMini from './MenuMini.vue';
import replace from 'ramda/es/replace'


const menuStore = useMenuStateStore()
const hover = ref(false)
const hoverMode = ref(menuStore.mode == 'mini hover')
let prevMode = menuStore.mode
if (menuStore.mode.match('close')) {
    prevMode = replace(/close| close/, '', menuStore.mode)
}
watch(() => hover.value, (n) => {
    if (!hoverMode.value)
        return;
    menuStore.mode = n ? 'normal hovermode' : 'mini hover'
})
watch(() => menuStore.mode, (n, p) => {
    prevMode = p
})
// console.log(menuStore.menu)
</script>

<template>

    <Button size="small" class="btn-float border-rounded-l-0 btn-float-sidebar flex justify-center items-center  "
        :class="{ 'close': menuStore.mode.match('close') }" raised @click="menuStore.mode = prevMode">
        <icon name="ph:arrow-fat-lines-right-thin" size="34" class />
    </Button>
    <div class="sidebar-control" :class="[menuStore.mode]">
        <div id="controlBtnSidebar">
            <span :class="[hoverMode ? 'active' : 'inactive']" @click="hoverMode = true; menuStore.mode = 'mini hover'">
                <span />
                <Icon name="icon-park-outline:sort-three" size="14" />
            </span>
            <span :class="[!hoverMode && menuStore.mode == 'mini' ? 'active' : 'inactive']"
                @click="hoverMode = false; menuStore.mode = 'mini'">
                <span />
                <Icon name="icon-park-outline:pushpin" size="14" />
            </span>
            <span :class="[!hoverMode && menuStore.mode == 'normal' ? 'active' : 'inactive']"
                @click="hoverMode = false; menuStore.mode = 'normal'">
                <span />
                <Icon name="icon-park-outline:pushpin" size="14" />
            </span>
        </div>
        <div id="controlVisibilityTl">
            <icon name="ph:arrow-fat-lines-left-thin" @click="menuStore.mode = menuStore.mode + ' close'" />
            <icon name="ph:arrow-fat-lines-down-thin" :class="{
                'expand': menuStore.collapse
            }" @click="menuStore.collapse = !menuStore.collapse" />
        </div>
    </div>
    <aside id="layout-sidebar" class="layout-sidebar" :class="[menuStore.mode, hoverMode ? 'hover' : '']"
        @mouseover="hover = true" @mouseleave="hover = false">

        <nav class="menu-large">
            <ol class=" layout-menu">
                <MenuLarge :mode="menuStore.mode" :menu="menuStore.menu" />
            </ol>
        </nav>
        <nav class=" menu-small">
            <ol class=" layout-menu">
                <MenuMini :mode="menuStore.mode" :menu="menuStore.menu" />
            </ol>
        </nav>
    </aside>
</template>
``````
