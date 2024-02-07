import { resolveDynamicComponent } from 'vue';


export function useIcon() {
  const iconProps = { size: "20", strokeWidth: "3", theme: "outline", class: " text-slate-900 flex" };
  const isComponent = (name) => {
    return typeof resolveDynamicComponent(name) !== 'string';
  }
  return { iconProps, isComponent }
}
