import { resolveDynamicComponent, ref } from 'vue';

const icons = {
  'header-menu': {},
  'my-icon': {},
}

type IconType = keyof typeof icons;
const data = { size: "33", strokeWidth: "2", theme: "two-tone", fill: ['#475569', '#f1f5f9'], strokeLinecap: "square", class: 'u-mx-xs cursor-pointer drop-shadow' }
const iconsHeaderNames = ['remind', 'mail', 'setting-two']


icons['header-menu'] = Array.from({ length: iconsHeaderNames.length }, (e, i) => {

  const { cloned } = useCloned(ref(data));
  return {
    name: iconsHeaderNames[i],
    order: i,
    attr: cloned,
  }
})
// {
//   props: ref({ size: "29", strokeWidth: "1.5", theme: "two-tone", fill: ['#334155', '#e2e8f0'], strokeLinecap: "square", class: 'u-mx-xs cursor-pointer ' }),
//     icons: [
//       {
//         name: 'api',
//         order: 3,
//         attr: ref(headerIconProps)
//       },
//       {
//         name: 'setting-two',
//         order: 2,
//         attr: ref(headerIconProps)
//       },
//       {
//         name: 'mail',
//         order: 1,
//         attr: ref(headerIconProps)
//       },
//       {
//         name: 'communication',
//         order: 0,
//         attr: ref(headerIconProps)
//       }
//     ].sort((a, b) => a < b ? 1 : -1)
// }



export function useIcon() {
  const iconProps = { size: "20", strokeWidth: "3", theme: "outline", class: " text-slate-900 flex" };
  const isComponent = (name: unknown) => {
    return typeof resolveDynamicComponent(name) !== 'string';
  }
  return {
    iconProps,
    isComponent,
    iconHeader: { size: "29", strokeWidth: "1.5", theme: "two-tone", fill: ['#334155', '#e2e8f0'], strokeLinecap: "square", class: 'u-mx-xs cursor-pointer ' },
    getIcons: (type: IconType): typeof icons[IconType] => icons[type]
  }
}
