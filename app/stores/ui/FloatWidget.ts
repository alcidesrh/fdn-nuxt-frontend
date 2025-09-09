import { defineStore } from 'pinia'

const html = document.querySelector('html')
const el = html.getBoundingClientRect()

interface State {
  x: Number
  y: Number
  w: Number
  h: Number
  pX: Number
  pY: Number
  htmlW: Number
  htmlH: Number
  bg: Object
  colorBorder: String
  mode: String
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
