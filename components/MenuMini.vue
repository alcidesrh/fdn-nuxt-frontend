<script setup>
// import { Down } from '@icon-park/vue-next';

const props = defineProps({

    menu: {
        type: Object,
        default: null
    },
    mode: {
        type: String,
        default: 'normal'
    },

})
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
    <li v-for="(menuitem, index) in menu" :key="`_root${index}`">

        <div v-if="menuitem.children" @click="menuRootClick(menuitem, $event)"
            class="grid items-center justify-center gap-2   overflow-hidden cursor-pointer">
            <span class="menu-icon m-auto">
                <Icon :name="menuitem.icon" mode="svg" />

            </span>
            <div class="truncate  m-auto max-w-full">{{ menuitem.name }}</div>
            <Icon name="icon-park-outline:down" class="menu-toggle-icon" size="24" mode="svg" />

        </div>

        <a v-if="menuitem.href" :href="menuitem.href" target="_blank" rel="noopener noreferrer">
            <span v-if="menuitem.icon" class="menu-icon">
                <i :class="menuitem.icon"></i>
            </span>
            <span>{{ menuitem.name }}</span>
            <Tag v-if="menuitem.badge" :value="menuitem.badge"></Tag>
        </a>

        <NuxtLink v-if="typeof menuitem.to != 'undefined'" to="/"
            :class="{ router_link_active: menuitem.to === route.fullPath }" class="flex justify-center">
            <span v-if="menuitem.icon" class="menu-icon m-auto" v-tooltip="menuitem.name">
                <Icon :name="menuitem.icon" mode="svg" />
            </span>
            <!-- <span>{{ menuitem.name }}</span> -->
        </NuxtLink>

        <span v-if="menuitem.subcategory" class="menu-child-category">{{ menuitem.name }}</span>
        <Transition name="layout-submenu">
            <div v-show="menuitem.children && (isActiveRootmenuItem(menuitem) || menuitem.open)"
                :class="{ 'open': menuitem.open }">
                <ol>
                    <MenuMini :mode="mode" :menu="menuitem.children"></MenuMini>
                </ol>
            </div>
        </Transition>
    </li>

</template>
