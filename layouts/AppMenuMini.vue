<script setup>
import { Down } from '@icon-park/vue-next';

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
    <li v-for="(menuitem, index) in menu" :key="`_root${index}`">

        <div v-if="menuitem.children" @click="menuRootClick(menuitem, $event)"
            class="grid items-center justify-center gap-2   overflow-hidden cursor-pointer">
            <span class="menu-icon m-auto">
                <component :is="menuitem.icon" v-if="isComponent(menuitem.icon)" v-bind="iconProps" />
            </span>
            <div class="truncate  m-auto max-w-full">{{ menuitem.name }}</div>
            <down class="menu-toggle-icon" theme="outline" size="24" fill="#334155" :strokeWidth="2" />

        </div>

        <a v-if="menuitem.href" :href="menuitem.href" target="_blank" rel="noopener noreferrer">
            <span v-if="menuitem.icon" class="menu-icon">
                <i :class="menuitem.icon"></i>
            </span>
            <span>{{ menuitem.name }}</span>
            <Tag v-if="menuitem.badge" :value="menuitem.badge"></Tag>
        </a>

        <NuxtLink v-if="menuitem.to" :to="menuitem.to" :class="{ 'router-link-active': menuitem.to === route.fullPath }"
            class="flex justify-center">
            <span v-if="menuitem.icon" class="menu-icon m-auto" v-tooltip="menuitem.name">
                <component :is="menuitem.icon" v-if="isComponent(menuitem.icon)" v-bind="iconProps" />
            </span>
            <!-- <span>{{ menuitem.name }}</span> -->
        </NuxtLink>

        <span v-if="menuitem.subcategory" class="menu-child-category">{{ menuitem.name }}</span>
        <Transition name="layout-submenu">
            <div v-show="menuitem.children && (isActiveRootmenuItem(menuitem) || menuitem.open)"
                :class="{ 'open': menuitem.open }">
                <ol>
                    <AppMenuMini :mode="mode" :menu="menuitem.children"></AppMenuMini>
                </ol>
            </div>
        </Transition>
    </li>

</template>
