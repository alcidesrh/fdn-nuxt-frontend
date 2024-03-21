import { reactive, ref, Ref } from 'vue';

export const menu = [
    {
        label: 'Boleto',
        icon: 'TicketsTwoIcon',
        opened: true,
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
            },
            {
                label: 'Estadísticas',
                icon: 'SearchIcon',
            }

        ]
    },

    {
        label: 'Encomienda',
        'icon': 'DropboxIcon',
        opened: true,
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
        ]
    },

    {
        label: 'Salidas',
        opened: true,
        icon: 'TreeDiagramIcon',
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
        ]
    }
];
let menu_roots = ref<Array<Boolean>>([]);

export function useMenu() {

    const iniMenuRoots = (l) => {
        menu_roots = ref(Array.from({ length: l }, () => true))
    }

    return { menu_roots, iniMenuRoots, menu }

}
