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
    root: {
        type: Boolean,
        default: false
    }
});
const router = useRouter();
const route = useRoute();

function isActiveRootmenuItem(menuitem) {
    return menuitem.children.some((item) => item.to === `/${router.currentRoute.value?.name?.replaceAll('-', '/')}` || (item.children && item.children.some((it) => it.to === `/${router.currentRoute.value.name}`)));
}
function menuRootClick(e, $event) {
    $event.preventDefault();
    e.open = !e.open;
}
</script>

<template>
    <ol v-if="root" class="layout-menu">
        <MenuMini :mode="mode" :menu="menu" />
    </ol>
    <li v-else v-for="(menuitem, index) in menu" :key="`_root${index}`">
        <div v-if="menuitem.children" @click="menuRootClick(menuitem, $event)" class="grid cursor-pointer items-center justify-center justify-items-center gap-2 overflow-hidden">
            <span class="menu-icon m-auto">
                <Icon :name="menuitem.icon" mode="svg" :class="{ root: root }" v-tooltip="menuitem.name" />
            </span>
            <div class="m-auto max-w-full truncate">{{ menuitem.name }}</div>
            <Icon name="icon-park-outline:down" class="menu-toggle-icon" :class="{ open: menuitem.open }" size="24" mode="svg" />
        </div>
        <a v-if="menuitem.href" :href="menuitem.href" target="_blank" rel="noopener noreferrer">
            <span v-if="menuitem.icon" class="menu-icon">
                <i :class="menuitem.icon"></i>
            </span>
            <span>{{ menuitem.name }}</span>
            <Tag v-if="menuitem.badge" :value="menuitem.badge"></Tag>
        </a>

        <NuxtLink v-if="typeof menuitem.to != 'undefined'" to="/" :class="{ router_link_active: menuitem.to === route.fullPath }" class="flex justify-center">
            <span v-if="menuitem.icon" class="menu-icon m-auto" v-tooltip="menuitem.name">
                <Icon :name="menuitem.icon" mode="svg" class="text-4xl" />
            </span>
        </NuxtLink>

        <span v-if="menuitem.subcategory" class="menu-child-category">{{ menuitem.name }}</span>
        <Transition name="layout-submenu">
            <div v-show="menuitem.children && (isActiveRootmenuItem(menuitem) || menuitem.open)" class="mt-1rem">
                <ol>
                    <!-- <MenuMini :mode="mode" :menu="menuitem.children" :root="false"></MenuMini> -->
                </ol>
            </div>
        </Transition>
        <div v-if="menuitem.children && root" class="w-55% mt-0.5rem mb-1rem m-auto border-t border-slate-300" />
    </li>
</template>
<style scoped>
.layout-menu {
    padding-top: 0.5rem !important;
    & > li {
        margin-bottom: 1.5rem;
        & > div {
            & .menu-toggle-icon {
                transition: transform 0.2s;
                transform: rotate(0deg);

                &.open {
                    transform: rotate(180deg);
                }
            }

            & .truncate {
                display: none;
                font-size: 14px;
            }

            & ol li:not(:first-child) {
                margin-top: 20px;

                &:last-child {
                    padding-bottom: 10px;
                    /* border-bottom: 1px solid var(--p-slate-200); */
                }
            }

            & .fdn-icon {
                width: 30px;
                height: 30px;

                color: var(--p-surface-contrast-500);

                &:is(svg) {
                    & > * > *,
                    & > * {
                        stroke-width: 3;
                    }
                }

                /* color: var(--p-surface-contrast-200); */

                &:not(.root) {
                }

                &.menu-toggle-icon {
                    color: var(--p-surface-contrast-400);
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
}
</style>
