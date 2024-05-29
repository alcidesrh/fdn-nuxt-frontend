<script setup>
import AppMenuItem from './AppMenuItem.vue';
import { equals } from 'ramda'

const themeState = useThemeStateStore()

const { menu } = useMenu();
const menuref = ref(menu)
// if (!equals(toRaw(themeState.sidebar.menu), menu)) {
//     themeState.sidebar.menu = menu

// }
import { NodeService } from '~~/utils/NodeService';


// console.log(themeState.sidebar.menu, themeState.layout.staticMenuDesktopInactive);
const nodes = ref(null);
NodeService.getTreeNodes().then((data) => (nodes.value = data));
const { iconProps, isComponent } = useIcon()

console.log(menu)
</script>

<template>
    <div class="card grid justify-content-center">
        <Transition name="layout-submenu">

            <Tree :value="menuref" class="w-full">
                <template #nodeicon="{ node }">
                    <div>
                        <component :is="node.icon" v-if="isComponent(node.icon)" v-bind="iconProps" />
                        <i v-else :class="node.icon" class="layout-menuitem-icon" />
                    </div>
                </template>
            </Tree>
        </Transition>
    </div>
    <ul class="layout-menu">
        <template v-for=" (item, i) in themeState.sidebar.menu" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"
                :array-length="themeState.sidebar.menu.length"></app-menu-item>
            <li v-else-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>
