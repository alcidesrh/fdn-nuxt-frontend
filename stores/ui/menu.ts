import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export interface Menu {
  label: string
  key?: string | number
  icon?: string
  opened?: boolean
  children?: Menu[]
}

export const useMenuStateStore = defineStore('useMenuState', {
  persist: true,
  state: () => ({
    keys: ref([]),
    menu: ref([
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
            icon: 'MarketAnalysis',
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
    ]),
  }),

  getters: {
    setKey: (state) => menuSetKey(state.menu),
  },
})

function menuSetKey(menu: Menu[]): Menu[] {
  for (let index = 0; index < menu.length; index++) {
    menu[index].key = uuidv4()
    if (menu[index]?.children?.length) {
      menu[index].children = menuSetKey(menu[index].children as Menu[])
    }
  }
  console.log(menu)
  return menu
}
