<script setup lang="ts">
const menu = [
  {
    label: 'Boleto',
    icon: 'icon-park-outline:tickets-checked',
    open: true,
    children: [
      {
        label: 'Emitir',
        icon: 'icon-park-outline:printer-two',
        to: '/usuarios',
      },
      {
        label: 'Chequear',
        icon: 'icon-park-outline:tickets-checked',
        to: '',
      },
      {
        label: 'Buscar',
        icon: 'icon-park-outline:search',
        to: '',
      },
      {
        label: 'Estadísticas',
        icon: 'icon-park-outline:market-analysis',
        to: '',
      },
    ],
  },

  {
    label: 'Encomienda',
    icon: 'icon-park-outline:dropbox',
    open: true,
    children: [
      {
        label: 'Registrar',
        icon: 'icon-park-outline:printer-one',
        to: '',
      },
      {
        label: 'Entregar',
        icon: 'icon-park-outline:delivery',
        to: '',
      },
      {
        label: 'Buscar',
        icon: 'icon-park-outline:search',
        open: true,
        children: [
          {
            label: 'Emitir',
            icon: 'icon-park-outline:printer-one',
            to: '',
          },
          {
            label: 'Chequear',
            icon: 'icon-park-outline:tickets-checked',
            to: '',
          },
          {
            label: 'Buscar',
            icon: 'icon-park-outline:search',
            to: '',
          },
          {
            label: 'Estadísticas',
            icon: 'icon-park-outline:search',
            to: '',
          },
        ],
      },
      {
        label: 'Procesar',
        icon: 'icon-park-outline:rotating-forward',
        to: '',
      },
    ],
  },

  {
    label: 'Salidas',
    open: true,
    icon: 'icon-park-outline:tree-diagram',
    children: [
      {
        label: 'Registrar',
        icon: 'icon-park-outline:printer-one',
        to: '',
      },
      {
        label: 'Entregar',
        icon: 'icon-park-outline:delivery',
        to: '',
      },
      {
        label: 'Buscar',
        icon: 'icon-park-outline:search',
        to: '',
      },
      {
        label: 'Procesar',
        icon: 'icon-park-outline:rotating-forward',
        to: '',
      },
    ],
  },
  {
    label: 'Clientes',
    open: true,
    icon: 'icon-park-outline:every-user',
    children: [
      {
        label: 'Registrar',
        icon: 'icon-park-outline:printer-one',
        to: '',
      },
      {
        label: 'Entregar',
        icon: 'icon-park-outline:delivery',
        to: '',
      },
      {
        label: 'Buscar',
        icon: 'icon-park-outline:search',
        to: '',
      },
      {
        label: 'Procesar',
        icon: 'icon-park-outline:rotating-forward',
        to: '',
      },
    ],
  },
]
const menuStore = useMenuStateStore('menu-left', menu)
const { toggle } = storeToRefs(menuStore)
</script>

<template>
  <SidebarDrawer store-id="sidebarLeft" position="left">
    <template #content="{ data }">
      <nav class="">
        <AMenu :mode="data.mode" :menu="menuStore.menu" :root="true" :toggle="toggle" position="left" @toggle="toggle = !toggle" />
      </nav>
    </template>
  </SidebarDrawer>
</template>
