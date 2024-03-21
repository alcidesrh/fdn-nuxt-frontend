import { resolveDynamicComponent, ref } from 'vue';

const icons = {
  'header-menu': {},
  'my-icon': {},
}

type IconType = keyof typeof icons;
const data = { strokeWidth: '4', theme: 'two-tone', fill: ['#64748b', '#f1f5f9'], strokeLinecap: 'square', class: 'u-mx-xs cursor-pointer drop-shadow' }
const iconsHeaderNames = ['remind', 'mail', 'setting-two']


icons['header-menu'] = Array.from({ length: iconsHeaderNames.length }, (e, i) => {

  const { cloned } = useCloned(data);
  return {
    name: iconsHeaderNames[i],
    order: i,
    attr: cloned,
  }
})

export function useIcon() {
  const iconProps = { strokeWidth: '2', theme: 'outline', class: ' flex' };
  const isComponent = (name: unknown) => {
    return typeof resolveDynamicComponent(name) !== 'string';
  }
  return {
    iconProps,
    isComponent,
    getIcons: (type: IconType): typeof icons[IconType] => icons[type]
  }
}
