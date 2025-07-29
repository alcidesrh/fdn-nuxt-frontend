<template>
    <div>
        <div class="h-70px ml-1rem fixed bottom-0 z-10 flex w-fit cursor-pointer items-center justify-center py-2 md:top-0">
            <icon @click="toggleSidebar" name="icon-park-outline:double-left" size="26" class="surface-contrast-500 [&>*]:stroke-4 transition-transform" :class="{ 'rotate-90': menuStore.mode == 'close' }" mode="svg" />
            <!-- <Button @click="toggleSidebar" raised text class="border-rounded-0px! border-0 p-0">
                <div class="w-40px h-30px relative flex cursor-pointer">
                    <div class="w-20px h-full" :class="menuStore.mode == 'close' ? 'bg-surface-contrast-600' : 'bg-surface-contrast-200 border-r-slate-3 border-r-1 max-w-13px absolute z-10'"></div>
                    <div class="z-20 flex h-full w-full items-center justify-center">
                        <icon :name="menuStore.mode == 'close' ? 'icon-park-outline:preview-open' : 'icon-park-outline:preview-close-one'" size="20" class="surface-contrast-600 [&>*]:stroke-3" mode="svg" />
                    </div>
                </div>
            </Button> -->
            <Divider layout="vertical" />
        </div>
        <div ref="sidebar" class="wrap-sidebar" :class="[menuStore.mode, position]">
            <icon @click="toggleSidebar" name="icon-park-outline:double-left" size="26" class="surface-contrast-500 [&>*]:stroke-4 m-auto transition-transform" :class="{ 'rotate-90': menuStore.mode == 'close' }" mode="svg" />
            <div class="sidebar-control mt-35px" :class="[menuStore.mode, position]">
                <div>
                    <div>
                        <div>
                            <RadioButton v-model="menuStore.mode" value="mini hover" />
                        </div>
                        <span :class="[menuStore.mode == 'mini hover' ? 'opacity-100' : 'opacity-30']"></span>
                    </div>
                    <div>
                        <div>
                            <RadioButton v-model="menuStore.mode" value="mini" />
                        </div>
                        <span :class="[!hoverMode && menuStore.mode == 'mini' ? 'opacity-100' : 'opacity-30']"></span>
                    </div>
                    <div>
                        <span :class="[!hoverMode && menuStore.mode == 'normal' ? 'opacity-100' : 'opacity-30']"></span>
                        <div>
                            <RadioButton v-model="menuStore.mode" value="normal" />
                        </div>
                    </div>
                </div>
            </div>
            <aside ref="sidebar" id="layout-sidebar" class="layout-sidebar mt-20px" :class="[menuStore.mode, position]" @mouseover="hover = true" @mouseleave="hover = false">
                <close v-if="isMobil" @close="menuStore.mode = 'close'" />

                <nav class="menu-large">
                    <ol class="layout-menu">
                        <MenuLarge :mode="menuStore.mode" :menu="menuStore.menu" />
                    </ol>
                </nav>
                <nav class="menu-small">
                    <ol class="layout-menu">
                        <MenuMini :mode="menuStore.mode" :menu="menuStore.menu" />
                    </ol>
                </nav>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import replace from 'ramda/es/replace';
const sidebar = ref();
const menuStore = useSidebarStore('sidebarLeft');
// const menuStore = useMenuStateStore();
interface Props {
    position?: string;
}
const { position = 'left' } = defineProps<Props>();
// const menu = useMenuStore()
// menu.resource({ params: [{ tipo: 'root' }, { username: 'usernae' }] }, 'getMenu')
const hover = ref(false);
const hoverMode = ref(menuStore.mode == 'mini hover');
let prevMode = menuStore.mode;

if (menuStore.mode.match('close')) {
    prevMode = replace(/close| close/, '', menuStore.mode);
}

watch(
    () => hover.value,
    (n) => {
        if (menuStore.mode != 'mini hover' && menuStore.mode != 'normal hovermode') return;
        menuStore.mode = n ? 'normal hovermode' : 'mini hover';
    }
);

watch(
    () => menuStore.mode,
    (n, p) => {
        if (n == 'mini hover') {
            hoverMode.value = true;
        } else {
            hoverMode.value = false;
        }

        prevMode = p;
    }
);

function toggleSidebar() {
    if (menuStore.mode != 'close') {
        prevMode = menuStore.mode;
        menuStore.mode = 'close';
    } else if (menuStore.mode == 'close' && !prevMode) {
        menuStore.mode = 'normal';
        prevMode = 'normal';
    } else {
        menuStore.mode = prevMode;
    }
}
</script>
