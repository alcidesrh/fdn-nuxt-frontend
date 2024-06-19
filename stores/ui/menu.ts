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
    const mode = ref('')
    let modeaux = ''
    const collapse = ref(true)
    const menu = ref([])
    const menu4 = ref([
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
        name: 'Clientes',
        open: true,
        icon: 'EveryUserIcon',
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
      () => mode.value,
      (n, o) => {
        return
        const menuTween = useSideBarTween()
        if (n != 'normal' && o != 'normal') {
          menuTween.menuTimeLine.to(['.layout-topbar-logo-container', '.sidebar-control-btn', '.layout-sidebar', '.layout-content'], { opacity: 0, duration: 0 })
          menuTween.menuTimeLine.revert()
        }
        if (n == 'mini') {
          menuTween.mini()
        } else if (n == 'close') {
          menuTween.close()
        } else if (n == 'normal') {
          menuTween.menuTimeLine.reverse()
        }
      }
    )
    // function setMode(v: string) {
    //   mode.value = mode.value != v ? v : 'normal'
    // }
    return {
      active,
      menu,
      menu4,
      collapse,
      mode,
      setMode: (v: string) => {
        if (!v) {
          mode.value = ''
          modeaux = ''
        } else if (!modeaux) {
          mode.value = v
          modeaux = v
        } else if (modeaux == v) {
          mode.value = 'normal'
          modeaux = ''
        } else {
          mode.value = modeaux + v
          modeaux = v
        }
      },
    }
  }
  // { persist: true }
)
