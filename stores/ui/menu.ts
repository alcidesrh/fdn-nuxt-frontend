import { defineStore } from 'pinia';
// import DomHandler from '@/utils/primevueutils/DomHandler'

export interface Menu {
    name: string;
    key?: string | number;
    icon?: string;
    open?: boolean;
    children?: Menu[];
}

export const useMenuStateStore = defineStore(
    'useMenuState',
    () => {
        const mode = ref(isMobil ? 'close' : 'normal');
        const menu = ref([
            {
                name: 'Boleto',
                icon: 'icon-park-outline:tickets-checked',
                open: true,
                children: [
                    {
                        name: 'Emitir',
                        icon: 'icon-park-outline:printer-two',
                        to: ''
                    },
                    {
                        name: 'Chequear',
                        icon: 'icon-park-outline:tickets-checked',
                        to: ''
                    },
                    {
                        name: 'Buscar',
                        icon: 'icon-park-outline:search',
                        to: ''
                    },
                    {
                        name: 'Estadísticas',
                        icon: 'icon-park-outline:market-analysis',
                        to: ''
                    }
                ]
            },

            {
                name: 'Encomienda',
                icon: 'icon-park-outline:dropbox',
                open: true,
                children: [
                    {
                        name: 'Registrar',
                        icon: 'icon-park-outline:printer-one',
                        to: ''
                    },
                    {
                        name: 'Entregar',
                        icon: 'icon-park-outline:delivery',
                        to: ''
                    },
                    {
                        name: 'Buscar',
                        icon: 'icon-park-outline:search',
                        open: true,
                        children: [
                            {
                                name: 'Emitir',
                                icon: 'icon-park-outline:printer-one',
                                to: ''
                            },
                            {
                                name: 'Chequear',
                                icon: 'icon-park-outline:tickets-checked',
                                to: ''
                            },
                            {
                                name: 'Buscar',
                                icon: 'icon-park-outline:search',
                                to: ''
                            },
                            {
                                name: 'Estadísticas',
                                icon: 'icon-park-outline:search',
                                to: ''
                            }
                        ]
                    },
                    {
                        name: 'Procesar',
                        icon: 'icon-park-outline:rotating-forward',
                        to: ''
                    }
                ]
            },

            {
                name: 'Salidas',
                open: true,
                icon: 'icon-park-outline:tree-diagram',
                children: [
                    {
                        name: 'Registrar',
                        icon: 'icon-park-outline:printer-one',
                        to: ''
                    },
                    {
                        name: 'Entregar',
                        icon: 'icon-park-outline:delivery',
                        to: ''
                    },
                    {
                        name: 'Buscar',
                        icon: 'icon-park-outline:search',
                        to: ''
                    },
                    {
                        name: 'Procesar',
                        icon: 'icon-park-outline:rotating-forward',
                        to: ''
                    }
                ]
            },
            {
                name: 'Clientes',
                open: true,
                icon: 'icon-park-outline:every-user',
                children: [
                    {
                        name: 'Registrar',
                        icon: 'icon-park-outline:printer-one',
                        to: ''
                    },
                    {
                        name: 'Entregar',
                        icon: 'icon-park-outline:delivery',
                        to: ''
                    },
                    {
                        name: 'Buscar',
                        icon: 'icon-park-outline:search',
                        to: ''
                    },
                    {
                        name: 'Procesar',
                        icon: 'icon-park-outline:rotating-forward',
                        to: ''
                    }
                ]
            }
        ]);

        return {
            menu,
            mode
        };
    },
    { persist: true }
);
