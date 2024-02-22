<script setup>
import { Minus, Plus } from '@icon-park/vue-next'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLayout } from './composables/layout'
import { useMenu } from './composables/menu'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 0,
  },
  root: {
    type: Boolean,
    default: true,
  },
  parentItemKey: {
    type: String,
    default: null,
  },
  openRoot: {
    type: Boolean,
    default: true,
  },
})
const route = useRoute()
const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle } = useLayout()
const isActiveMenu = ref(false)
const itemKey = ref(null)

const { menu_roots } = useMenu()

onBeforeMount(() => {
  itemKey.value = props.parentItemKey ? `${props.parentItemKey}-${props.index}` : String(props.index)
  const activeItem = layoutState.activeMenuItem
  if (props.root)
    isActiveMenu.value = true

  else
    isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(`${itemKey.value}-`) : false
})

watch(
  () => layoutConfig.activeMenuItem.value,
  (newVal) => {
    isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(`${itemKey.value}-`)
  },
)

function itemClick(event, item) {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  const { overlayMenuActive, staticMenuMobileActive } = layoutState

  if ((item.to || item.url) && (staticMenuMobileActive.value || overlayMenuActive.value))
    onMenuToggle()

  if (item.command)
    item.command({ originalEvent: event, item })

  const foundItemKey = item.items ? (isActiveMenu.value ? props.parentItemKey : itemKey) : itemKey.value
  setActiveMenuItem(foundItemKey)
}

function checkActiveRoute(item) {
  return route.path === item.to
}

function root_click(event) {
  event.preventDefault()
  menu_roots.value[props.index] = !menu_roots.value[props.index]
  isActiveMenu.value = menu_roots.value[props.index]
}

function is_submenu_open() {
  if (!props.root)
    return isActiveMenu.value

  if (props.openRoot != menu_roots[props.index])
    isActiveMenu.value = menu_roots.value[props.index]

  return isActiveMenu.value
}

const { iconProps, isComponent } = useIcon()
</script>

<template>
  <Divider v-if="item.type == 'divider'" type="dashed" class="mx-auto my-4" />
  <li v-else class="cursor-pointer" :class="{ 'layout-root-menuitem ': root, 'active-menuitem': isActiveMenu }">
    <div v-if="root && item.visible !== false"
      class="layout-menuitem-root-text root-label w-full font-medium !py-1.5 !pl-0 " @click="e => root && root_click(e)">
      <Minus theme="outline" size="18" :stroke-width="2" stroke-linecap="square" />
      <Plus theme="outline" size="18" :stroke-width="2" stroke-linecap="square" />
      <span class="ml-1 !py-0">{{ item.label }}</span>
      <DownIcon v-bind="iconProps" class="layout-submenu-toggler text-slate-230" />
    </div>
    <a v-if="(!item.to || item.items) && item.visible !== false" :href="item.url" :class="item.class"
      :target="item.target" tabindex="0" @click="itemClick($event, item, index)">
      <div class="flex u-p-2xs">
        <component :is="item.icon" v-if="isComponent(item.icon)" v-bind="iconProps" />
        <i v-else :class="item.icon" class="layout-menuitem-icon" />
        <span class="layout-menuitem-text">{{ item.label }}</span>
        <DownIcon v-if="item.items" class="layout-submenu-toggler" v-bind="iconProps" />
      </div>
    </a>
    <router-link v-if="item.to && !item.items && item.visible !== false"
      :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to"
      @click="itemClick($event, item, index)">
      <i :class="item.icon" class="layout-menuitem-icon" />
      <span class="layout-menuitem-text">{{ item.label }}</span>
      <i v-if="item.items" class="layout-submenu-toggler pi pi-fw pi-angle-down" />
    </router-link>
    <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
      <ul v-show="is_submenu_open()" class="layout-submenu">
        <app-menu-item v-for="(child, i) in item.items " :key="child" :index="i" :item="child" :parent-item-key="itemKey"
          :root="false" />
      </ul>
    </Transition>
  </li>
</template>

<style lang="scss" scoped>
</style>
