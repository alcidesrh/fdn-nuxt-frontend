<script setup lang="ts">
import { isEmpty } from 'ramda'

const themeState = useThemeStateStore()
const menuStore = useMenuStateStore()


const { iconProps, isComponent } = useIcon()

const expandMenu = (node: [Record<any, any>]) => {
    for (let i = 0; i < node.length; i++) {
        menuStore.keys[node[i].key] = true
        if (node[i].children && node[i].children.length) {
            expandMenu(node[i].children);
        }
    }
};

const siderbar_toggle = (direction = 'horizontal') => {
    if (direction == 'vertical') {
        if (isEmpty(menuStore.keys)) {
            expandMenu(menuStore.menu)


            console.log(menuStore.keys)
        }
        else {
            menuStore.keys = []
        }
        console.log(menuStore.keys)

        themeState.sidebar.v_opened = !themeState.sidebar.v_opened;
        themeState.onMenuToggleVertical()
    }
    else {
        themeState.sidebar.h_opened = !themeState.sidebar.h_opened
        themeState.onMenuToggle()
    }
}

</script>

<template>

    <div class="relative h-46px w-70px">
        <div class="menu-control flex justify-end">
            <!-- <Icon name="material-symbols-light:arrows-outward" @click="siderbar_toggle('vertical')" class="rotate-90" />
        <Icon name="material-symbols-light:arrows-outward" @click="siderbar_toggle" /> -->
            <!-- <i class="pi pi-arrow-right-arrow-left text-30px"></i>
        <Button rounded outlined aria-label="Filter">
            <template #icon>
                <i class="pi pi-arrow-right-arrow-left"></i>
            </template> </Button> -->
            <!-- <Button icon="pi pi-arrow-right-arrow-left" text raised rounded aria-label="Filter" /> -->
            <Button @click="siderbar_toggle('vertical')" icon="pi pi-sort-alt" severity="secondary" rounded outlined
                aria-label="Bookmark" />
            <Button @click="siderbar_toggle" icon="pi pi-arrow-right-arrow-left" severity="secondary" rounded outlined
                aria-label="Bookmark" />
        </div>
    </div>


    <Tree v-model:expandedKeys="menuStore.keys" @nodeCollapse="onNodeCollapse" selectionMode="single"
        :value="menuStore.menu" class="w-full " :pt="{ root: { class: '!bg-transparent' } }">
        <template #nodeicon="{ node }">
            <component :is="node.icon" v-if="isComponent(node.icon)" v-bind="iconProps" />
            <i v-else :class="node.icon" class="layout-menuitem-icon" />
        </template>
        <template #nodetoggleicon="{ node }">
            <component :is="node.icon" v-if="isComponent(node.icon)" v-bind="iconProps" />
            <i v-else :class="node.icon" class="layout-menuitem-icon" />
        </template>
    </Tree>
</template>
