<script setup>
const props = defineProps({
    /*    item: {
            type: Object,
            default: () => ({}),
        },
        index: {
            type: Number,
            default: 0,
        },*/
    root: {
        type: Boolean,
        default: true,
    },
    menu: {
        type: Object,
        default: null
    },
    // parentItemKey: {
    //     type: String,
    //     default: null,
    // },
    // arrayLength: {
    //     type: Number,
    //     default: null
    // },
    // openRoot: {
    //     type: Boolean,
    //     default: true,
    // },
})
const { iconProps, isComponent } = useIcon()
const router = useRouter()
const route = useRoute()

function isActiveRootmenuItem(menuitem) {
    return (
        menuitem.children.some((item) => item.to === `/${router.currentRoute.value?.name?.replaceAll('-', '/')}` || (item.children && item.children.some((it) => it.to === `/${router.currentRoute.value.name}`))))

}
function menuRootClick(e, $event) {
    $event.preventDefault()
    e.open = !e.open
}
</script>

<template>
    <li v-for="(menuitem, index) in menu" :key="`_root${index}`" style="width: inherit;" class="u-mb-3xs">
        <button v-if="menuitem.children" @click="menuRootClick(menuitem, $event)" type="button"
            class="grid! justify-center! gap-2 p-0!">
            <span class="menu-icon m-auto! mr-auto! w-fit!">
                <component :is="menuitem.icon" v-if="isComponent(menuitem.icon)" v-bind="iconProps" />
            </span>
            <span class="font-semibold u--text-3 truncate px-4px">{{ menuitem.name }}</span>
            <i class="menu-toggle-icon pi pi-angle-down m-auto"></i>
        </button>

        <a v-if="menuitem.href" :href="menuitem.href" target="_blank" rel="noopener noreferrer">
            <span v-if="menuitem.icon && root" class="menu-icon">
                <i :class="menuitem.icon"></i>
            </span>
            <span class="truncate  px-4px">{{ menuitem.name }}</span>
            <Tag v-if="menuitem.badge" :value="menuitem.badge"></Tag>
        </a>

        <NuxtLink v-if="menuitem.to" :to="menuitem.to" :class="{ 'router-link-active': menuitem.to === route.fullPath }"
            class="border-0! grid! justify-center p-0!">
            <span v-if="menuitem.icon" class="menu-icon m-auto!">
                <component :is="menuitem.icon" v-if="isComponent(menuitem.icon)" v-bind="iconProps" />
            </span>
            <span class="truncate  px-4px">{{ menuitem.name }}</span>
            <Tag v-if="menuitem.badge" :value="menuitem.badge"></Tag>
        </NuxtLink>

        <!-- <span v-if="!root && menuitem.children" class="menu-child-category truncate  px-4px">{{ menuitem.name }}</span> -->
        <Transition name="layout-submenu">
            <!-- <div v-show="(menuitem.children && root && isActiveRootmenuItem(menuitem)) && !menuitem.open"> -->
            <div v-show="menuitem.children && (isActiveRootmenuItem(menuitem) || menuitem.open)" class="open">
                <!-- :class="{ open: menuitem.children && root && isActiveRootmenuItem(menuitem) && menuitem.open }"> -->
                <ol class="m-0! u-mt-xs! grid gap-3">
                    <AppMiniMenuItem :root="false" :menu="menuitem.children"></AppMiniMenuItem>
                </ol>
            </div>
        </Transition>

        <divider v-if="root" class="before:border-slate-200! w-80%! m-auto! u-my-xs!" />

    </li>

</template>
<style scoped>
.layout-submenu-enter-from,
.layout-submenu-leave-to {
    max-height: 0;
}

.layout-submenu-enter-to,
.layout-submenu-leave-from {
    max-height: 1000px;
}

.layout-submenu-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.layout-submenu-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}
</style>
