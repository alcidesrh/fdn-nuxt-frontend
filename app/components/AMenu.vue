`<template>
  <div v-if="root" class="menu-wraper relative" :class="[mode, clases, position]">

    <div class="relative ml-auto overflow-visible w-24px h-24px right-.8rem cursor-pointer" @click="toggleMenu">
      <Icon name="icon-park-outline:up-one"
        class="menu-toggle-icon  [&>*]:stroke-0 [&>*]:fill-slate-300  absolute -mt-10px " size="35" mode="svg" />
      <Icon name="icon-park-outline:down-one" class="menu-toggle-icon  [&>*]:stroke-0 [&>*]:fill-slate-300 absolute"
        size="35" mode="svg" />
    </div>

    <ol class="layout-menu">
      <AMenu :mode="mode" :menu="menu" :position="position" />
    </ol>

  </div>

  <li v-for="(menuitem, index) in menu" v-else :key="`_root${index}`">
    <div v-if="menuitem.children" class="menu-root" @click="menuRootClick(menuitem, $event)">
      <div class="menu-icon">
        <Icon :name="menuitem.icon" mode="svg" :class="{ root }" />
      </div>
      <div class="truncate">
        {{ menuitem.label }}
      </div>
      <Icon name="icon-park-outline:down" class="menu-toggle-icon [&>*]:stroke-1 text-slate-500 absolute right-2"
        :class="{ open: menuitem.open }" size="24" mode="svg" />
      <!-- <div class="w-55% mt-0.5rem mb-1rem m-auto border-t border-slate-300" /> -->


    </div>

    <a v-if="menuitem.href" :href="menuitem.href" target="_blank" rel="noopener noreferrer">
      <div v-if="menuitem.icon" class="menu-icon">
        <i :class="menuitem.icon" />
      </div>
      <div>{{ menuitem.label }}</div>
    </a>

    <NuxtLink v-if="typeof menuitem.to != 'undefined' || menuitem.name" :to="!menuitem.name
      ? menuitem.to
      : { name: menuitem.name, params: menuitem.params }
      ">
      <div class="menu-icon">
        <Icon :name="menuitem.icon" mode="svg" />
      </div>
      <div class="truncate">
        {{ menuitem.label }}
      </div>
    </NuxtLink>

    <span v-if="menuitem.subcategory" class="menu-child-category">{{
      menuitem.label
    }}</span>

    <Transition name="layout-submenu">
      <div v-show="menuitem.children
        && (isActiveRootmenuItem(menuitem) || menuitem.open)
        ">
        <ol>
          <AMenu :mode="mode" :menu="menuitem.children" :root="false" :position="position" />
        </ol>
      </div>
    </Transition>
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  menu: {
    type: Array<any>,
    default: null,
  },
  mode: {
    type: String,

    default: 'normal',
  },
  root: {
    type: Boolean,
    default: false,
  },
  toggle: {
    type: Boolean,
  },
  clases: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: 'left',
  },
})
// import { Down } from '@icon-park/vue-next';
const emit = defineEmits(['toggle'])
const router = useRouter()
const toggle = ref(props.toggle)

function isActiveRootmenuItem(menuitem) {
  return menuitem.children.some(
    item =>
      item.to
      === `/${router.currentRoute.value?.label?.replaceAll('-', '/')}`
      || (item.children
        && item.children.some(
          it => it.to === `/${router.currentRoute.value.label}`,
        )),
  )
}
function menuRootClick(e, $event) {
  $event.preventDefault()
  e.open = !e.open
}
function toggleMenu() {
  toggle.value = !toggle.value
  emit('toggle')
  const recursv = (pmenu: Array<any>, toggle) => {
    for (let index = 0; index < pmenu.length; index++) {
      if (typeof pmenu[index].open != 'undefined') {
        pmenu[index].open = toggle
      }
      if (typeof pmenu[index].children != 'undefined') {
        recursv(pmenu[index].children, toggle)
      }
    }
  }
  recursv(props.menu, toggle.value)
}
</script>
<style scoped>
.menu-wraper {
  display: grid;
  width: 100%;
  container-type: inline-size;
  container-name: sidebar;

  &>.toggle-menu {
    border-radius: 999px;
    position: relative;
    margin-left: auto;
    margin-right: calc(.5rem + 3px);
    cursor: pointer;
    font-size: 24px;
    /* padding: 3px; */
    /* border: 1px solid var(--p-surface-300); */
    /* background-color: var(--p-surface-contrast-100); */

    &:deep(path) {

      /* display: none; */
      /* stroke: var(--p-surface-contrast-400); */
      stroke-width: 2px;
      color: var(--p-surface-contrast-400)
    }
  }


  &.small>.toggle-menu {
    margin-left: auto;
    margin-right: auto;
    left: auto;
    top: auto;
  }


  &.small {
    position: relative;

    &>svg {
      position: relative;
    }

    &>ol.layout-menu {
      padding-top: 0.5rem;

      &>li {
        margin-bottom: 1.5rem;

        &>div {
          &.menu-root {
            display: grid;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            justify-items: center;
            gap: 2px;
            overflow: hidden;
          }

          & .menu-icon {
            width: 100%;
            display: flex;
            padding: 5px 0px;
            justify-content: center;
            cursor: pointer;

            &+div {
              margin: auto;
              width: fit-content;
              margin-top: 5px;
            }

            &>svg {
              font-size: 20px;
              color: var(--p-surface-700);

              &>>>path,
              &>>>g {
                stroke-width: 2px;
              }
            }
          }

          & .menu-toggle-icon {
            transition: transform 0.2s;
            transform: rotate(0deg);
            margin: 5px auto;
            cursor: pointer;
            position: relative;
            right: 0px;


            &.open {
              transform: rotate(180deg);
            }
          }

          & ol li:not(:first-child) {
            margin-top: 20px;

            &:last-child {
              padding-bottom: 10px;
            }
          }

          /* & .fdn-icon {

            width: 25px;
            height: 25px;

            color: var(--p-surface-contrast-600);

            &:is(svg) {

              &>*>*,
              &>* {
                stroke-width: 3;
              }
            }


            &:not(.root) {}

            &.menu-toggle-icon {


              color: var(--p-surface-contrast-400);
              width: 24px;
              height: 24px;
            }
          } */

          & a.router-link-active.router-link-exact-active {
            &>.menu-icon {
              border-radius: 4px;
              background-color: var(--p-surface-contrast-200);
              color: var(--p-surface-contrast-800);

              &>.menu-icon {
                border: 1px solid var(--p-surface-400);
              }
            }
          }

          & .truncate {
            display: none;
          }
        }
      }

      &>.layout-submenu>div {
        margin-top: 1rem;
      }
    }
  }

  &.onhover,
  &.normal,
  &.close {
    &>.layout-menu {
      &>li {
        margin-bottom: 15px;
        cursor: pointer;

        & .menu-root {
          display: flex;
          align-items: center;
          padding: 0.5rem 1px;
          padding-top: 0px;
          position: relative;

          &>.menu-toggle-icon {
            transition: transform 0.3s;
            transform: rotate(0deg);

            &.open {
              transform: rotate(180deg);
            }
          }


          &>.fdn-icon.menu-toggle-icon {
            position: absolute;
            right: 0.5rem;
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
            &:is(svg) {

              &>*>*,
              &>* {
                stroke-width: 3.5px;
              }
            }
          }

          &>svg {
            font-size: 18px;
            color: var(--p-surface-contrast-500);

            &>>>g,
            &>>>path {
              stroke-width: 3px;
            }
          }
        }

        &>div ol {
          margin: 0 0 0 1rem;

          &>li ol {
            margin: 0 0 0 1.3rem;
          }

          & li {

            &>div.menu-root,
            &>a {
              border-left: 1px solid var(--p-surface-contrast-200);
              padding: 0.5rem;
              padding-right: 0px;

              &:hover {
                background-color: var(--p-surface-contrast-200);
                border-left: 1.5px solid var(--p-surface-400);
                color: var(--p-surface-contrast-800);

                &>.menu-icon {
                  border: 1px solid var(--p-surface-400);
                }
              }

              &.router-link-active.router-link-exact-active {
                background-color: var(--p-surface-contrast-100);
                border-left: 3px solid var(--p-surface-300);
                color: var(--p-surface-contrast-800);

                &>.menu-icon {
                  border: 1px solid var(--p-surface-contrast-300);
                  background-color: var(--p-surface-contrast-50);

                }
              }
            }
          }
        }
      }
    }
  }
}



@container sidebar (width < 190px) {
  /* .truncate { */
  /* display: none !important; */
  /* } */
}
</style>
`
