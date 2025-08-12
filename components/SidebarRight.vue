<template>
    <SidebarDrawer storeId="sidebarRight" position="right">
        <template #content="{ data }">
            <!-- <nav class=" ">
                <MenuLarge :mode="data.mode" :menu="menu" :root="true" />
            </nav> -->
            <nav>
                <AMenu :mode="data.mode" :menu="menuStore.menu" :root="true" :toggle="toggle" @toggle="toggle = !toggle" clases="right" />
            </nav>
        </template>
    </SidebarDrawer>
</template>
<script setup lang="ts">
const menu = [
    {
        label: 'Mi cuenta',
        icon: 'icon-park-outline:edit-name',
        open: true,
        children: [
            {
                label: 'Editar',
                icon: 'icon-park-outline:pencil',
                name: 'user_edit',
                params: { id: user.value.username }
            },
            {
                label: 'Chequear',
                icon: 'icon-park-outline:tickets-checked',
                to: ''
            },
            {
                label: 'Buscar',
                icon: 'icon-park-outline:search',
                to: ''
            },
            {
                label: 'Estadísticas',
                icon: 'icon-park-outline:market-analysis',
                to: ''
            }
        ]
    },

    {
        label: 'Encomienda',
        icon: 'icon-park-outline:dropbox',
        open: true,
        children: [
            {
                label: 'Registrar',
                icon: 'icon-park-outline:printer-one',
                to: ''
            },
            {
                label: 'Entregar',
                icon: 'icon-park-outline:delivery',
                to: ''
            },
            {
                label: 'Buscar',
                icon: 'icon-park-outline:search',
                open: true,
                children: [
                    {
                        label: 'Emitir',
                        icon: 'icon-park-outline:printer-one',
                        to: ''
                    },
                    {
                        label: 'Chequear',
                        icon: 'icon-park-outline:tickets-checked',
                        to: ''
                    },
                    {
                        label: 'Buscar',
                        icon: 'icon-park-outline:search',
                        to: ''
                    },
                    {
                        label: 'Estadísticas',
                        icon: 'icon-park-outline:search',
                        to: ''
                    }
                ]
            },
            {
                label: 'Procesar',
                icon: 'icon-park-outline:rotating-forward',
                to: ''
            }
        ]
    },

    {
        label: 'Salidas',
        open: true,
        icon: 'icon-park-outline:tree-diagram',
        children: [
            {
                label: 'Registrar',
                icon: 'icon-park-outline:printer-one',
                to: ''
            },
            {
                label: 'Entregar',
                icon: 'icon-park-outline:delivery',
                to: ''
            },
            {
                label: 'Buscar',
                icon: 'icon-park-outline:search',
                to: ''
            },
            {
                label: 'Procesar',
                icon: 'icon-park-outline:rotating-forward',
                to: ''
            }
        ]
    },
    {
        label: 'Clientes',
        open: true,
        icon: 'icon-park-outline:every-user',
        children: [
            {
                label: 'Registrar',
                icon: 'icon-park-outline:printer-one',
                to: ''
            },
            {
                label: 'Entregar',
                icon: 'icon-park-outline:delivery',
                to: ''
            },
            {
                label: 'Buscar',
                icon: 'icon-park-outline:search',
                to: ''
            },
            {
                label: 'Procesar',
                icon: 'icon-park-outline:rotating-forward',
                to: ''
            }
        ]
    }
];
const menuStore = useMenuStateStore('menu-right', menu);
const { toggle } = storeToRefs(menuStore);
</script>
