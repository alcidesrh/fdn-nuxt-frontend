import { defineStore } from 'pinia'
import DomHandler from '@/utils/primevueutils/DomHandler'

export interface Menu {
  name: string
  key?: string | number
  icon?: string
  open?: boolean
  children?: Menu[]
}
export const useMenuStateStore = defineStore(
  'useMenuState',
  () => {
    const active = ref(false)
    const mode = ref('normal')
    const collapse = ref(true)
    const menu1 = ref([])
    const menu = ref([
      {
        name: 'Boleto',
        icon: 'TicketsTwoIcon',
        open: true,
        children: [
          {
            name: 'Emitir',
            icon: 'PrinterOne',
            to: '/path',
          },
          {
            name: 'Chequear',
            icon: 'TicketsCheckedIcon',
            to: '/path',
          },
          {
            name: 'Buscar',
            icon: 'SearchIcon',
            to: '/path',
          },
          {
            name: 'Estadísticas',
            icon: 'MarketAnalysis',
            to: '/path',
          },
        ],
      },

      {
        name: 'Encomienda',
        icon: 'DropboxIcon',
        open: true,
        children: [
          {
            name: 'Registrar',
            icon: 'PrinterOne',
            to: '/path',
          },
          {
            name: 'Entregar',
            icon: 'DeliveryIcon',
            to: '/path',
          },
          {
            name: 'Buscar',
            icon: 'SearchIcon',
            open: true,
            children: [
              {
                name: 'Emitir',
                icon: 'PrinterOne',
                to: '/path',
              },
              {
                name: 'Chequear',
                icon: 'TicketsCheckedIcon',
                to: '/path',
              },
              {
                name: 'Buscar',
                icon: 'SearchIcon',
                to: '/path',
              },
              {
                name: 'Estadísticas',
                icon: 'SearchIcon',
                to: '/path',
              },
            ],
          },
          {
            name: 'Procesar',
            icon: 'RotatingForwardIcon',
            to: '/path',
          },
        ],
      },

      {
        name: 'Salidas',
        open: true,
        icon: 'TreeDiagramIcon',
        children: [
          {
            name: 'Registrar',
            icon: 'PrinterOne',
            to: '/path',
          },
          {
            name: 'Entregar',
            icon: 'DeliveryIcon',
            to: '/path',
          },
          {
            name: 'Buscar',
            icon: 'SearchIcon',
            to: '/path',
          },
          {
            name: 'Procesar',
            icon: 'RotatingForwardIcon',
            to: '/path',
          },
        ],
      },
      {
        name: 'Salidas',
        open: true,
        icon: 'TreeDiagramIcon',
        children: [
          {
            name: 'Registrar',
            icon: 'PrinterOne',
            to: '/path',
          },
          {
            name: 'Entregar',
            icon: 'DeliveryIcon',
            to: '/path',
          },
          {
            name: 'Buscar',
            icon: 'SearchIcon',
            to: '/path',
          },
          {
            name: 'Procesar',
            icon: 'RotatingForwardIcon',
            to: '/path',
          },
        ],
      },
    ])

    watch(
      () => collapse.value,
      (n, o) => {
        for (let i = 0; i < menu.value.length; i++) {
          if (menu.value[i].children?.length) {
            menu.value[i].open = collapse.value
          }
        }
      }
    )

    watch(
      () => active.value,
      (n, o) => {
        if (n == 1) {
          DomHandler.blockBodyScroll('blocked-scroll')
        } else if (n == 0) {
          DomHandler.unblockBodyScroll('blocked-scroll')
        }
      }
    )
    // function setMode(v: string) {
    //   mode.value = mode.value != v ? v : 'normal'
    // }
    return {
      active,
      menu,
      menu1,
      collapse,
      mode,
      setMode: (v: string) => (mode.value = mode.value != v ? v : 'normal'),
    }
  },
  { persist: true }
)
