<template>
    <div @mouseover="hoverMouse = true" @mouseleave="hoverMouse = false" :class="[`toggle-sidebar`, `${sidebarStore.position}`, `${sidebarStore.mode}`, openDialbtn ? 'open-dialbtn' : '']" severity="contrast" variant="outlined" raised>
        <!-- <icon :name="sidebarStore.position == 'left' ? `icon-park-outline:right-two` : `material-symbols-light:settings-account-box-outline-sharp`" mode="svg" /> -->
        <SpeedDial @show="openDialbtn = true" @hide="openDialbtn = false" :model="items" :radius="120" type="quarter-circle" :direction="sidebarStore.position == 'left' ? 'up-right' : 'up-left'" :tooltipOptions="{ position: 'left' }">
            <template #button="{ toggleCallback }">
                <div @click="toggleCallback" data-pc-name="pcbutton" class="menu-btn">
                    <icon :name="sidebarStore.position == 'left' ? `mdi:bus-clock` : `material-symbols:person-celebrate`" mode="svg" />
                </div>
            </template>
            <template #item="{ item, toggleCallback }">
                <div v-tooltip.left="item.label" text rounded raised @click="toggleCallback" class="menu-btn item">
                    <icon :name="sidebarStore.position == 'left' ? `icon-park-outline:right-two` : `material-symbols:person-celebrate`" mode="svg" />
                </div>
            </template>
        </SpeedDial>
    </div>
    <div @mouseover="hoverMouse2 = true" @mouseleave="hoverMouse2 = false" ref="sidebar" class="wrap-sidebar" :class="[sidebarStore.position, sidebarStore.mode, classes]">
        <div class="sidebar-control" :class="[sidebarStore.position]">
            <div :class="[sidebarStore.position, sidebarStore.mode]">
                <div :class="{ selected: hoverMode && sidebarStore.mode == modes.close }" @click="toggleSidebar()"></div>
                <div :class="{ selected: !hoverMode && sidebarStore.mode == modes.small }" @click="sidebarStore.mode = modes.small">
                    <span></span>
                </div>

                <div :class="{ selected: !hoverMode && sidebarStore.mode == modes.normal }" @click="sidebarStore.mode = modes.normal">
                    <span></span>
                </div>
            </div>
        </div>
        <aside ref="sidebar" id="layout-sidebar" class="layout-sidebar" :class="[sidebarStore.mode]">
            <close v-if="isMobil" @close="sidebarStore.mode = modes.close" />

            <slot name="content" :data="sidebarStore"></slot>
        </aside>
    </div>
    <div @mouseover="hoverMouse3 = true" @mouseleave="hoverMouse3 = false" class="toggle-sidebar-lateral" :class="[sidebarStore.position, sidebarStore.mode]"></div>
</template>
<style src="~/assets/layout/admin/sidebar.css" />

<script setup lang="ts">
interface Props {
    position?: string;
    classes?: string;
    storeId: string;
}
const { position = 'left', classes = '', storeId } = defineProps<Props>();

const sidebar = ref();
const sidebarStore = useSidebarStore(storeId, position);
const modes = sidebarStore.modeStates;
const hoverMouse = ref(false);
const hoverMouse2 = ref(false);
const hoverMouse3 = ref(false);
const hoverMode = ref(sidebarStore.mode == modes.onhover);
let prevMode = sidebarStore.mode;
const openDialbtn = ref(false);
const { start, isPending, stop } = useTimeoutFn(
    () => {
        sidebarStore.mode = modes.close;
    },
    300,
    { immediate: false }
);

watch(
    () => hoverMouse.value,
    (n) => {
        if (!n && sidebarStore.mode == modes.onhover) {
            start();
        } else if (n && sidebarStore.mode == modes.close) {
            if (isPending.value) {
                stop();
            }
            sidebarStore.mode = modes.onhover;
        }
    }
);
watch(
    () => hoverMouse3.value,
    (n) => {
        if (n && sidebarStore.mode == modes.close) {
            sidebarStore.mode = modes.onhover;
        }
    }
);
watch(
    () => hoverMouse2.value,
    (n) => {
        if (sidebarStore.mode == modes.onhover) {
            if (!n) {
                start();
            } else if (n) {
                if (isPending.value) {
                    stop();
                }
            }
        }
    }
);

watch(
    () => sidebarStore.mode,
    (n, p) => {
        if (n == modes.close) {
            hoverMode.value = true;
        } else {
            hoverMode.value = false;
        }

        prevMode = p;
    }
);

function toggleSidebar() {
    if (sidebarStore.mode != modes.close) {
        prevMode = sidebarStore.mode;
        sidebarStore.mode = modes.close;
    } else if (sidebarStore.mode == modes.close && (!prevMode || prevMode == modes.close)) {
        sidebarStore.mode = modes.normal;
        prevMode = modes.normal;
    } else {
        sidebarStore.mode = prevMode;
    }
}

const items = ref([
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => {
            toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added', life: 3000 });
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated', life: 3000 });
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
        }
    },
    {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
            router.push('/fileupload');
        }
    },
    {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://vuejs.org/';
        }
    }
]);
</script>
