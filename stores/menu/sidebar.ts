import { defineStore } from 'pinia';

export interface SidebarState {
    mode: Ref<string>;
    menu: Ref<Array<any>>;
    position: string;
}

const definedStores = new Map<string, ReturnType<typeof defineSidebarStore>>();
const sidebarStoreFactory = (storeId: string, position: string) => {
    if (!definedStores.has(storeId)) {
        definedStores.set(storeId, defineSidebarStore(storeId, position));
    }

    return definedStores.get(storeId) as ReturnType<typeof defineSidebarStore>;
};

function defineSidebarStore<Id extends string, Position extends string>(storeId: Id, position: Position) {
    return defineStore(storeId, {
        persist: true,
        state: (): SidebarState => {
            return {
                mode: ref(isMobil.value ? 'close' : 'normal'),
                position: position,
                menu: ref([
                    {
                        name: 'Boleto',
                        icon: 'icon-park-outline:tickets-checked',
                        open: true,
                        children: [
                            {
                                name: 'Emitir',
                                icon: 'icon-park-outline:printer-two',
                                to: '/usuarios'
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
                ])
            };
        },
        getters: {
            modeStates: (state) => {
                return {
                    normal: `normal`,
                    small: `small`,
                    mini: `mini`,
                    onhover: `onhover`,
                    close: `close`
                    // normal: `${state.position}-normal`,
                    // small: `${state.position}-small`,
                    // mini: `${state.position}-mini`,
                    // onhover: `${state.position}-onhover`,
                    // close: `${state.position}-close`
                };
            }
        }
        /* ...*/
    });
}
export const useSidebarStore = (storeId: string, position = 'left') => {
    return sidebarStoreFactory(storeId, position)();
};
