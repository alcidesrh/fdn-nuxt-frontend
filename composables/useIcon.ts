import { resolveDynamicComponent, ref } from "vue";

const icons = {
  "header-menu": {},
  "my-icon": {},
};

type IconType = keyof typeof icons;
const data = {
  strokeWidth: "3",
  theme: "two-tone",
  // fill: ["#93c5fd", "#334155"],
  strokeLinecap: "square",
  class: "u-mx-6xs cursor-pointer drop-shadow text-30px fill-orange",
};
const iconsHeaderNames = ["remind", "mail", "setting-two"];

icons["header-menu"] = Array.from(
  { length: iconsHeaderNames.length },
  (e, i) => {
    const { cloned } = useCloned(data);
    return {
      name: iconsHeaderNames[i],
      order: i,
      attr: cloned,
    };
  }
);

export function useIcon() {
  const iconProps = {
    strokeWidth: "4",
    theme: "outline",
    class: " flex",
    size: 15,
  };
  const isComponent = (name: unknown) => {
    return typeof resolveDynamicComponent(name) !== "string";
  };
  return {
    iconProps,
    isComponent,
    getIcons: (type: IconType): typeof icons[IconType] => icons[type],
  };
}
