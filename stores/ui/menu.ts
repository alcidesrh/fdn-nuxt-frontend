import { defineStore } from 'pinia'
// import DomHandler from '@/utils/primevueutils/DomHandler'

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
    const ctrlBtnHorizontal = ref('horizontal')
    const mode = ref('normal')
    const modeaux = ref('')
    const collapse = ref(true)
    const colorBtn = ref({ label: '--surface-700', value: '#334155' })
    const colorBorde = ref({ label: '--surface-400', value: '#94a3b8' })
    const colorBtnBg = ref({ label: '--surface-0', value: '#fff' })
    const btnH = ref(40)
    const btnW = ref(40)
    const iconSize = ref(15)
    const rotate = ref(0)
    const gap = ref(1)
    const pinned = ref(true)
    const menu4 = ref([])
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
          mode.value = ''
          modeaux.value = ''
        } else if (modeaux.value == v || (modeaux.value == 'mini' && v.match('close'))) {
          mode.value = 'normal'
          modeaux.value = 'normal'
        } else {
          mode.value = v
          modeaux.value = v
        }
        document.querySelector('.qq').innerHTML = document.querySelector('.qq').innerHTML + '<br>-mode=' + mode.value + '<br>-modeaux=' + modeaux.value + '<br>--------------------------'
      },
    }
  },
  { persist: true }
)
