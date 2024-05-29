import { reactive, ref, ref } from 'vue'

interface Menu {
  label: string
  key?: string | number
  icon?: string
  opened?: boolean
  children?: Menu[]
}
const data: Menu[] = [
  {
    label: 'Boleto',
    icon: 'TicketsTwoIcon',
    opened: true,
    children: [
      {
        label: 'Emitir',
        icon: 'PrinterOne',
      },
      {
        label: 'Chequear',
        icon: 'TicketsCheckedIcon',
      },
      {
        label: 'Buscar',
        icon: 'SearchIcon',
      },
      {
        label: 'Estadísticas',
        icon: 'SearchIcon',
      },
    ],
  },

  {
    label: 'Encomienda',
    icon: 'DropboxIcon',
    opened: true,
    children: [
      {
        label: 'Registrar',
        icon: 'PrinterOne',
      },
      {
        label: 'Entregar',
        icon: 'DeliveryIcon',
      },
      {
        label: 'Buscar',
        icon: 'SearchIcon',
        children: [
          {
            label: 'Emitir',
            icon: 'PrinterOne',
          },
          {
            label: 'Chequear',
            icon: 'TicketsCheckedIcon',
          },
          {
            label: 'Buscar',
            icon: 'SearchIcon',
          },
          {
            label: 'Estadísticas',
            icon: 'SearchIcon',
          },
        ],
      },
      {
        label: 'Procesar',
        icon: 'RotatingForwardIcon',
      },
    ],
  },

  {
    label: 'Salidas',
    opened: true,
    icon: 'TreeDiagramIcon',
    children: [
      {
        label: 'Registrar',
        icon: 'PrinterOne',
      },
      {
        label: 'Entregar',
        icon: 'DeliveryIcon',
      },
      {
        label: 'Buscar',
        icon: 'SearchIcon',
      },
      {
        label: 'Procesar',
        icon: 'RotatingForwardIcon',
      },
    ],
  },
]

export const menu = menuSetKey(data)

let menu_roots = ref<Array<Boolean>>([])

function menuSetKey(menu: Menu[], key = 1): Menu[] {
  for (let index = key; index < menu.length; index++) {
    menu[index].key = key++
    if (menu[index]?.children?.length) {
      menu[index].children = menuSetKey(menu[index].children as Menu[], key)
    }
  }
  return menu
}
export function useMenu() {
  const iniMenuRoots = (l) => {
    menu_roots = ref(Array.from({ length: l }, () => true))
  }

  return { menu_roots, iniMenuRoots, menu }
}
