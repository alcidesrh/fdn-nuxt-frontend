import { defineStore } from 'pinia'

const html = document.querySelector('html')
const el = html.getBoundingClientRect()

interface State {
  x: number
  y: number
  w: number
  h: number
  pX: number
  pY: number
  htmlW: number
  htmlH: number
  bg: object
  colorBorder: string
  mode: string
}
export const useFloatWidgetStore = defineStore('FloatWidgetStore', {
  persist: true,
  state: (): State => ({
    x: 80,
    y: 60,
    w: 4,
    h: 8,
    pX: 80,
    pY: 60,
    htmlW: el.width,
    htmlH: el.height,
    bg: { label: 'Transparente', value: 'transparent' },
    colorBorder: 'none',
    mode: 'bloqueado',
  }),
})
