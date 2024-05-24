<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'


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
  arrayLength: {
    type: Number,
    default: null
  },
  openRoot: {
    type: Boolean,
    default: true,
  },
})
const route = useRoute()
const itemKey = ref(null)

const themeState = useThemeStateStore()

function itemClick(event, item) {
  if (item.disabled) {
    event.preventDefault()
    return
  }

  const { overlayMenuActive, staticMenuMobileActive } = themeState.layout.

    if((item.to || item.url) && (staticMenuMobileActive.value || overlayMenuActive.value))
  themeState.onMenuToggle()

  if (item.command)
    item.command({ originalEvent: event, item })

  const foundItemKey = item.items ? (item.opened ? props.parentItemKey : itemKey) : itemKey.value
  themeState.setActiveMenuItem(foundItemKey)
}
// console.log(props.arrayLength)
function checkActiveRoute(item) {
  return route.path === item.to
}

const { iconProps, isComponent } = useIcon()
</script>

<template>
  <div v-if="item.type == 'divider'" type="dashed" class="mx-auto mb-1" />

  <li v-else class="cursor-pointer " :class="{ 'layout-root-menuitem ': root }">

    <div v-if="root && item.visible !== false" class="rounded layout-menuitem-root-text u-p-xs"
      @click="item.opened = !item.opened">

      <component :is="item.icon" v-if="isComponent(item.icon)" v-bind="iconProps" />

      <span>{{ item.label }}</span>

      <DownIcon v-bind="iconProps" size="20" stroke-width="3" class="layout-submenu-toggler u-mr-s"
        :class="{ 'rotate-0': !item.opened, 'rotate-180': item.opened }" />
    </div>
    <a v-if="(!item.to || item.items) && item.visible !== false" :href="item.url" :class="item.class"
      :target="item.target" tabindex="0" @click="itemClick($event, item, index)">
      <div class="flex u-p-s u-pl-m">
        <component :is="item.icon" v-if="isComponent(item.icon)" v-bind="iconProps" />
        <i v-else :class="item.icon" class="layout-menuitem-icon" />
        <span class="layout-menuitem-text ">{{ item.label }}</span>

        <DownIcon v-if="item.items" class="layout-submenu-toggler" v-bind="iconProps" />
      </div>
    </a>
    <div class="mx-auto w-70% h-0.1px bg-neutral-500/10" />
    <router-link v-if="item.to && !item.items && item.visible !== false"
      :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to"
      @click="itemClick($event, item, index)">
      <i :class="item.icon" class="layout-menuitem-icon" />
      <span class="layout-menuitem-text">{{ item.label }}</span>
      <i v-if="item.items" class="layout-submenu-toggler pi pi-fw pi-angle-down" />
    </router-link>
    <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
      <ul v-show="item.opened" class="layout-submenu rounded">
        <app-menu-item v-for=" (child, i) in item.items " :key="child" :index="i" :item="child"
          :parent-item-key="itemKey" :root="false" />
      </ul>
    </Transition>
  </li>
</template>

<style lang="scss" scoped></style>
