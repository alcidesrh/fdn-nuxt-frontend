<template>
    <div ref="sidebar" class="wrap-sidebar admin-sidebar" :class="[sidebarStore.mode, position]">
        <div class="sidebar-control" :class="[sidebarStore.mode, position]">
            <div>
                <div>
                    <span :class="[sidebarStore.mode == 'mini hover' ? 'opacity-100' : 'opacity-30']"></span>
                    <div>
                        <RadioButton v-model="sidebarStore.mode" value="mini hover" />
                    </div>
                </div>
                <div>
                    <span :class="[!hoverMode && sidebarStore.mode == 'mini' ? 'opacity-100' : 'opacity-30']"></span>
                    <div>
                        <RadioButton v-model="sidebarStore.mode" value="mini" />
                    </div>
                </div>
                <div>
                    <span :class="[!hoverMode && sidebarStore.mode == 'normal' ? 'opacity-100' : 'opacity-30']"></span>
                    <div>
                        <RadioButton v-model="sidebarStore.mode" value="normal" />
                    </div>
                </div>
            </div>
        </div>
        <aside ref="sidebar" id="layout-sidebar" class="layout-sidebar" :class="[sidebarStore.mode, position]" @mouseover="hover = true" @mouseleave="hover = false">
            <close v-if="isMobil" @close="sidebarStore.mode = 'close'" />
            <nav class="sidebar-large">
                <ol class="layout-sidebar">
                    <MenuLarge :mode="sidebarStore.mode" :sidebar="sidebarStore.sidebar" />
                </ol>
            </nav>
            <nav class="sidebar-small">
                <ol class="layout-sidebar">
                    <MenuMini :mode="sidebarStore.mode" :sidebar="sidebarStore.sidebar" />
                </ol>
            </nav>
        </aside>
    </div>
</template>
<style src="~/assets/layout/admin/sidebar.css" />

<script setup lang="ts">
// <div class="admin-sidebar" :class="{ visible: visible }">
//         <h1>Admin & Config</h1>
//         <divider />
//         <Entities />
//         <div class="fixed-center-vertical text-slate-6 bg-slate-3">
//             <Icon name="icon-park-outline:setting-two" @click="visible = !visible" mode="svg" />
//         </div>
//     </div>
import replace from 'ramda/es/replace';
import Entities from './Entities.vue';

interface Props {
    position?: string;
}
const { position = 'left' } = defineProps<Props>();

const visible = ref(false);

const sidebar = ref();
import { useSidebarStore } from '~/stores/menu/sidebar';
const sidebarStore = useSidebarStore('sidebarRight');
const hover = ref(false);
const hoverMode = ref(sidebarStore.mode == 'mini hover');
let prevMode = sidebarStore.mode;

if (sidebarStore.mode.match('close')) {
    prevMode = replace(/close| close/, '', sidebarStore.mode);
}

watch(
    () => hover.value,
    (n) => {
        if (sidebarStore.mode != 'mini hover' && sidebarStore.mode != 'normal hovermode') return;
        sidebarStore.mode = n ? 'normal hovermode' : 'mini hover';
    }
);

watch(
    () => sidebarStore.mode,
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
    if (sidebarStore.mode != 'close') {
        prevMode = sidebarStore.mode;
        sidebarStore.mode = 'close';
    } else if (sidebarStore.mode == 'close' && !prevMode) {
        sidebarStore.mode = 'normal';
        prevMode = 'normal';
    } else {
        sidebarStore.mode = prevMode;
    }
}
</script>

<style scoped></style>
