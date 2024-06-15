<script setup lang="ts">
import { isEmpty } from 'ramda'

const themeState = useThemeStateStore()
const sidebar = useMenuStateStore()


const { iconProps, isComponent } = useIcon()

const expandMenu = (node: [Record<any, any>]) => {
    for (let i = 0; i < node.length; i++) {
        sidebar.keys[node[i].key] = true
        if (node[i].children && node[i].children.length) {
            expandMenu(node[i].children);
        }
    }
};
const siderbar_toggle = (direction = 'horizontal') => {
    if (direction == 'vertical') {
        if (isEmpty(sidebar.keys)) {
            expandMenu(sidebar.menu)


            console.log(sidebar.keys)
        }
        else {
            sidebar.keys = []
        }
        console.log(sidebar.keys)

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

            <Button @click="siderbar_toggle('vertical')" icon="pi pi-sort-alt" severity="secondary" rounded outlined
                aria-label="Bookmark" />
            <Button @click="siderbar_toggle" icon="pi pi-arrow-right-arrow-left" severity="secondary" rounded outlined
                aria-label="Bookmark" />
        </div>
    </div>


    <Tree v-model:expandedKeys="sidebar.keys" @nodeCollapse="onNodeCollapse" selectionMode="single"
        :value="sidebar.menu" class="w-full " :pt="{ root: { class: '!bg-transparent' } }">
        <template #nodeicon="{ node }">
            <component :is="node.icon" v-if="isComponent(node.icon)" v-bind="iconProps" />
            <i v-else :class="node.icon" class="layout-menuitem-icon" />
        </template>
        <!-- <template #nodetoggleicon="{ node }">
            <component :is="node.icon" v-if="isComponent(node.icon)" v-bind="iconProps" />
            <i v-else :class="node.icon" class="layout-menuitem-icon" />
        </template> -->
    </Tree>
</template>
