<script setup>
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
const route = useRoute();

function menuRootClick(e, $event) {
    $event.preventDefault();
    e.open = !e.open;
}
</script>

<template>
    <ol v-if="root" class="layout-menu">
        <MenuLarge :mode="mode" :menu="menu" />
    </ol>
    <li v-else v-for="(menuitem, index) in menu" :key="`_root${index}`">
        <div v-if="menuitem.children" class="menu-root" :class="{ open: menuitem.open }" @click="menuRootClick(menuitem, $event)">
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

        <NuxtLink v-if="typeof menuitem.to != 'undefined'" :to="menuitem.to">
            <span v-if="menuitem.icon" class="menu-icon">
                <Icon :name="menuitem.icon" mode="svg" class="" />
            </span>
            <span>{{ menuitem.name }}</span>
            <Tag v-if="menuitem.badge" :value="menuitem.badge" />
        </NuxtLink>

        <span v-if="menuitem.subcategory" class="menu-child-category">{{ menuitem.name }}</span>

        <Transition name="layout-submenu">
            <div v-show="menuitem.children && menuitem.open" :class="{ open: menuitem.open }">
                <ol>
                    <MenuLarge :mode="mode" :menu="menuitem.children" />
                </ol>
            </div>
        </Transition>
    </li>
</template>
<style scoped>
.layout-menu > li {
    margin-bottom: 15px;
    cursor: pointer;
    & .menu-root {
        display: flex;
        align-items: center;
        padding: 0.5rem 1px;
        padding-top: 0px;
        position: relative;
        &:has(+ div.open) > .fdn-icon.menu-toggle-icon {
            transition: transform 0.3s;
            transform: rotate(180deg);
        }
        & > .fdn-icon.menu-toggle-icon {
            position: absolute;
            right: calc(1rem);
        }
    }
    & a {
        display: flex;
        align-items: center;
        padding: 0.5rem 1px;
    }
    & .menu-icon {
        margin-right: 0.5rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 6px;

        & .fdn-icon {
            width: 20px;
            height: 20px;
            color: var(--p-surface-contrast-600);

            /* stroke-width: 2px; */
            &:is(svg) {
                & > * > *,
                & > * {
                    stroke-width: 3.5px;
                }
            }
        }
    }
    & > div ol {
        margin: 0 0 0 1rem;

        & > li ol {
            margin: 0 0 0 1.3rem;
        }

        & li {
            & > div.menu-root,
            & > a {
                border-left: 1px solid var(--p-surface-contrast-300);
                padding: 0.5rem;
                padding-right: 0px;

                &:hover {
                    background-color: var(--p-surface-contrast-200);
                    border-left: 1.5px solid var(--p-surface-400);
                    color: var(--p-surface-contrast-800);

                    & > .menu-icon {
                        border: 1px solid var(--p-surface-400);
                    }
                }
            }
        }
    }
}
.router-link-active.router-link-exact-active {
    background-color: var(--p-surface-contrast-200);
    border-left: 1.5px solid var(--p-surface-400);
    color: var(--p-surface-contrast-800);

    & > .menu-icon {
        border: 1px solid var(--p-surface-400);
    }
}
</style>
