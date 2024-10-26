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

// function isActiveRootmenuItem(menuitem) {
//     return (
//         menuitem.children.some((item) => item.to === `[/${router.currentRoute.value?.name?.replaceAll('-', '/')}]` || (item.children && item.children.some((it) => it.to === `/${router.currentRoute.value.name}`))))

// }
function menuRootClick(e, $event) {
    $event.preventDefault()
    e.open = !e.open
}


</script>

<template>
    <li v-for="(menuitem, index) in menu" :key="`_root${index}`">

        <div v-if="menuitem.children" class="menu-root" @click="menuRootClick(menuitem, $event)">
            <span class="menu-icon">
                <Icon :name="menuitem.icon" mode="svg" class="" />
            </span>
            <span class="truncate">{{ menuitem.name }}</span>
            <Icon name="icon-park-outline:down" class="menu-toggle-icon [&>*]:stroke-2" mode="svg" size="24" />

        </div>

        <a v-if="menuitem.href" :href="menuitem.href" target="_blank" rel="noopener noreferrer">
            <span v-if="menuitem.icon" class="menu-icon">
                <i :class="menuitem.icon" />
            </span>
            <span>{{ menuitem.name }}</span>
            <Tag v-if="menuitem.name" :value="menuitem.name" />
        </a>

        <NuxtLink v-if="typeof menuitem.to != 'undefined'" to="/"
            :class="{ 'router-link-active': menuitem.to === route.fullPath }">
            <span v-if="menuitem.icon" class="menu-icon">
                <Icon :name="menuitem.icon" mode="svg" class="" />
            </span>
            <span>{{ menuitem.name }}</span>
            <Tag v-if="menuitem.badge" :value="menuitem.badge" />
        </NuxtLink>

        <span v-if="menuitem.subcategory" class="menu-child-category">{{ menuitem.name }}</span>

        <Transition name="layout-submenu">
            <div v-show="menuitem.children && (menuitem.open)" :class="{ 'open': menuitem.open }">
                <ol>
                    <MenuLarge :mode="mode" :menu="menuitem.children" />
                </ol>
            </div>
        </Transition>
    </li>
</template>
