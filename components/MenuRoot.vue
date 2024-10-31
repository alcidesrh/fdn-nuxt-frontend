<template>

    <div class="w-fit h-70px cursor-pointer z-10 fixed bottom-0 md:top-0 flex justify-center items-center ml-1rem py-2">
        <Button @click="toggleSidebar" raised text class="p-0 border-0 border-rounded-0px!">
            <div class="w-40px h-30px  relative flex cursor-pointer ">
                <div class="w-20px bg-surface-contrast-600 h-full"></div>
                <div class="flex justify-center items-center w-full h-full">
                    <icon
                        :name="menuStore.mode != 'close' ? 'icon-park-outline:preview-open' : 'icon-park-outline:preview-close-one'"
                        size="20" class="surface-contrast-600 [&>*]:stroke-3" mode="svg" />
                </div>
            </div>
        </Button>
        <Divider layout="vertical" />
    </div>
    <div ref="sidebar" class="wrap-sidebar" :class="[menuStore.mode]">
        <div class="sidebar-control" :class="[menuStore.mode]">
            <div>
                <div>
                    <span :class="[menuStore.mode == 'mini hover' ? 'opacity-100' : 'opacity-30']"></span>
                    <div>
                        <RadioButton v-model="menuStore.mode" value="mini hover" />
                    </div>
                </div>
                <div>
                    <span :class="[!hoverMode && menuStore.mode == 'mini' ? 'opacity-100' : 'opacity-30']"></span>
                    <div>
                        <RadioButton v-model="menuStore.mode" value="mini" />
                    </div>
                </div>
                <div>
                    <span :class="[!hoverMode && menuStore.mode == 'normal' ? 'opacity-100' : 'opacity-30']"></span>
                    <div>
                        <RadioButton v-model="menuStore.mode" value="normal" />
                    </div>
                </div>
            </div>
        </div>
        <aside ref="sidebar" id="layout-sidebar" class="layout-sidebar" :class="[menuStore.mode]"
            @mouseover="hover = true" @mouseleave="hover = false">
            <close v-if="isMobil" @close="menuStore.mode = 'close'" />
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
    </div>
</template>

<script setup lang="ts">
import replace from 'ramda/es/replace'

const sidebar = ref()



const menuStore = useMenuStateStore()
const hover = ref(false)
const hoverMode = ref(menuStore.mode == 'mini hover')
let prevMode = menuStore.mode

if (menuStore.mode.match('close')) {
    prevMode = replace(/close| close/, '', menuStore.mode)
}

watch(() => hover.value, (n) => {

    if (menuStore.mode != 'mini hover' && menuStore.mode != 'normal hovermode')
        return;
    menuStore.mode = n ? 'normal hovermode' : 'mini hover'
})

watch(() => menuStore.mode, (n, p) => {
    if (n == 'mini hover') {
        hoverMode.value = true;
    }
    else {
        hoverMode.value = false;
    }

    prevMode = p
})

function toggleSidebar() {

    if (menuStore.mode != 'close') {
        prevMode = menuStore.mode
        menuStore.mode = 'close'
    }
    else if ((menuStore.mode == 'close' && !prevMode)) {
        menuStore.mode = 'normal'
        prevMode = 'normal'
    }
    else {
        menuStore.mode = prevMode
    }

}
</script>
