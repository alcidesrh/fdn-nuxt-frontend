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
        const active = ref(false);
        const ctrlBtnHorizontal = ref('horizontal');
        const mode = ref('normal');
        const modeaux = ref('');
        const collapse = ref(true);
        const colorBtn = ref({ label: '--p-surface-700', value: '#334155' });
        const colorBorde = ref({ label: '--p-surface-400', value: '#94a3b8' });
        const colorBtnBg = ref({ label: '--p-surface-0', value: '#fff' });
        const btnH = ref(40);
        const btnW = ref(40);
        const iconSize = ref(15);
        const rotate = ref(0);
        const gap = ref(1);
        const pinned = ref(true);
        const menu4 = ref([]);
        const menu = ref([
            {
                name: 'Boleto',
                icon: 'icon-park-outline:tickets-checked',
                open: true,
                children: [
                    {
                        name: 'Emitir',
                        icon: 'icon-park-outline:printer-two',
                        to: '/path'
                    },
                    {
                        name: 'Chequear',
                        icon: 'icon-park-outline:tickets-checked',
                        to: '/path'
                    },
                    {
                        name: 'Buscar',
                        icon: 'icon-park-outline:search',
                        to: '/path'
                    },
                    {
                        name: 'Estadísticas',
                        icon: 'icon-park-outline:market-analysis',
                        to: '/path'
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
                        to: '/path'
                    },
                    {
                        name: 'Entregar',
                        icon: 'icon-park-outline:delivery',
                        to: '/path'
                    },
                    {
                        name: 'Buscar',
                        icon: 'icon-park-outline:search',
                        open: true,
                        children: [
                            {
                                name: 'Emitir',
                                icon: 'icon-park-outline:printer-one',
                                to: '/path'
                            },
                            {
                                name: 'Chequear',
                                icon: 'icon-park-outline:tickets-checked',
                                to: '/path'
                            },
                            {
                                name: 'Buscar',
                                icon: 'icon-park-outline:search',
                                to: '/path'
                            },
                            {
                                name: 'Estadísticas',
                                icon: 'icon-park-outline:search',
                                to: '/path'
                            }
                        ]
                    },
                    {
                        name: 'Procesar',
                        icon: 'icon-park-outline:rotating-forward',
                        to: '/path'
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
                        to: '/path'
                    },
                    {
                        name: 'Entregar',
                        icon: 'icon-park-outline:delivery',
                        to: '/path'
                    },
                    {
                        name: 'Buscar',
                        icon: 'icon-park-outline:search',
                        to: '/path'
                    },
                    {
                        name: 'Procesar',
                        icon: 'icon-park-outline:rotating-forward',
                        to: '/path'
                    }
                ]
            },
            {
                name: 'Clientes',
                open: true,
                icon: 'icon-park-outline:EveryUser',
                children: [
                    {
                        name: 'Registrar',
                        icon: 'icon-park-outline:printer-one',
                        to: '/path'
                    },
                    {
                        name: 'Entregar',
                        icon: 'icon-park-outline:delivery',
                        to: '/path'
                    },
                    {
                        name: 'Buscar',
                        icon: 'icon-park-outline:search',
                        to: '/path'
                    },
                    {
                        name: 'Procesar',
                        icon: 'icon-park-outline:rotating-forward',
                        to: '/path'
                    }
                ]
            }
        ]);

        watch(
            () => collapse.value,
            (n, o) => {
                for (let i = 0; i < menu.value.length; i++) {
                    if (menu.value[i].children?.length) {
                        menu.value[i].open = collapse.value;
                    }
                }
            }
        );
        return {
            active,
            ctrlBtnHorizontal,
            menu,
            menu4,
            collapse,
            mode,
            modeaux,
            colorBtn,
            colorBorde,
            colorBtnBg,
            btnW,
            btnH,
            pinned,
            iconSize,
            rotate,
            gap,
            setMode: (v: string) => {
                if (!v) {
                    mode.value = '';
                    modeaux.value = '';
                } else if (modeaux.value == v || (modeaux.value == 'mini' && v.match('close'))) {
                    mode.value = 'normal';
                    modeaux.value = 'normal';
                } else {
                    mode.value = v;
                    modeaux.value = v;
                }
                document.querySelector('.qq').innerHTML = document.querySelector('.qq').innerHTML + '<br>-mode=' + mode.value + '<br>-modeaux=' + modeaux.value + '<br>--------------------------';
            }
        };
    }
    // { persist: true }
);
