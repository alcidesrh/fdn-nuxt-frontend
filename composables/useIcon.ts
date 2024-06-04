import { resolveDynamicComponent, ref } from 'vue'

const icons = {
  'header-menu': {},
  'my-icon': {},
}

type IconType = keyof typeof icons
const data = {
  strokeWidth: '2',
  theme: 'filled',
  // fill: ["#93c5fd", "#334155"],
  strokeLinecap: 'square',
  class: ' cursor-pointer',
  size: 25,
}
const iconsHeaderNames = ['remind', 'mail', 'setting-two']

icons['header-menu'] = Array.from({ length: iconsHeaderNames.length }, (e, i) => {
  const { cloned } = useCloned(data)
  return {
    name: iconsHeaderNames[i],
    order: i,
    attr: cloned,
  }
})

export function useIcon() {
  const iconProps = {
    strokeWidth: '2',
    theme: 'outline',
    class: ' flex',
    size: 20,
  }
  const isComponent = (name: unknown) => {
    return typeof resolveDynamicComponent(name) !== 'string'
  }
  return {
    iconProps,
    isComponent,
    getIcons: (type: IconType): (typeof icons)[IconType] => icons[type],
  }
}
