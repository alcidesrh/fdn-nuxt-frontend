import { reactive, ref, Ref } from 'vue';

export const model = reactive([
    {
        label: 'Boleto',
        icon: 'TicketsTwoIcon',
        items: [
            {
                label: 'Emitir',
                icon: 'PrinterOne',
            },
            {
                label: 'Chequear',
                icon: 'TicketsCheckedIcon'
            },
            {
                label: 'Buscar',
                icon: 'SearchIcon',
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        label: 'Encomienda',
        'icon': 'DataSwitchingIcon',
        items: [
            {
                label: 'Registrar',
                icon: 'PrinterOne',
            },
            {
                label: 'Entregar',
                icon: 'DeliveryIcon'
            },
            {
                label: 'Buscar',
                icon: 'SearchIcon',
            },
            {
                label: 'Procesar',
                icon: 'RotatingForwardIcon',
            },
            {
                label: 'Pendientes',
                icon: 'AdProductIcon',
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        label: 'Salidas',
        items: [
            {
                label: 'Form Layout',
                icon: 'pi pi-fw pi-id-card',
                to: '/uikit/formlayout'
            },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            {
                label: 'Float Label',
                icon: 'TicketsTwoIcon',
                to: '/uikit/floatlabel'
            },
            {
                label: 'Invalid State',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/uikit/invalidstate'
            },
            {
                label: 'Button',
                icon: 'pi pi-fw pi-mobile',
                to: '/uikit/button',
                class: 'rotated-icon'
            },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panels' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            {
                label: 'Menu',
                icon: 'pi pi-fw pi-bars',
                to: '/uikit/menu',
                preventExact: true
            },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/messages' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/chart' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },
    {
        type: 'divider'
    },
    {
        label: 'Prime Blocks',
        items: [
            {
                label: 'Free Blocks',
                icon: 'pi pi-fw pi-eye',
                to: '/blocks',
                badge: 'NEW'
            },
            {
                label: 'All Blocks',
                icon: 'pi pi-fw pi-globe',
                url: 'https://www.primefaces.org/primeblocks-vue',
                target: '_blank'
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        label: 'Utilities',
        items: [
            {
                label: 'PrimeIcons',
                icon: 'pi pi-fw pi-prime',
                to: '/utilities/icons'
            },
            {
                label: 'PrimeFlex',
                icon: 'pi pi-fw pi-desktop',
                url: 'https://www.primefaces.org/primeflex/',
                target: '_blank'
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                to: '/landing'
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/crud'
            },
            {
                label: 'Timeline',
                icon: 'pi pi-fw pi-calendar',
                to: '/timeline'
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/notfound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/empty'
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'TicketsTwoIcon',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'TicketsTwoIcon',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'TicketsTwoIcon' },
                            { label: 'Submenu 1.1.2', icon: 'TicketsTwoIcon' },
                            { label: 'Submenu 1.1.3', icon: 'TicketsTwoIcon' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'TicketsTwoIcon',
                        items: [{ label: 'Submenu 1.2.1', icon: 'TicketsTwoIcon' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'TicketsTwoIcon',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'TicketsTwoIcon',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'TicketsTwoIcon' },
                            { label: 'Submenu 2.1.2', icon: 'TicketsTwoIcon' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'TicketsTwoIcon',
                        items: [{ label: 'Submenu 2.2.1', icon: 'TicketsTwoIcon' }]
                    }
                ]
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-question',
                to: '/documentation'
            },
            {
                label: 'Figma',
                url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
                icon: 'pi pi-fw pi-pencil',
                target: '_blank'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-search',
                url: 'https://github.com/primefaces/sakai-nuxt',
                target: '_blank'
            },
            {
                label: 'Create-Vue Version',
                url: 'https://github.com/primefaces/sakai-vue',
                icon: 'pi pi-fw pi-star'
            }
        ]
    }
]);
let menu_roots = ref<Array<Boolean>>([]);

export function useMenu() {

    const iniMenuRoots = (l) => {
        menu_roots = ref(Array.from({ length: l }, () => true))
    }
    const setMenuRoots = (v) => {
        menu_roots.value.fill(v)
    }
    return { menu_roots, iniMenuRoots, model, setMenuRoots }

}
