// @unocss-include
export default [
  {
    $el: "div",
    children: "Iniciar Session",
    attrs: {
      class: "u-text-3  text-zinc-500  u-mb-7xs text-center",
      style: "font-family: Fast-Track",
    },
  },
  {
    $formkit: "text",
    name: "username",
    label: "Usuario",
    validation: "required",
    labelClass: "u-text-1 font-semibold text-zinc-500 u-mt-s u-mb-5xs",
  },
  {
    $formkit: "password",
    name: "password",
    label: "Contraseña",
    validation: "required",
    labelClass: "u-text-1 font-semibold  text-zinc-500 u-mt-s u-mb-5xs",
  },
  {
    $formkit: "submit",
    name: "submit",
    label: "Aceptar",
    classes: {
      wrapper: "flex justify-end u-mt-xl u-text-2",
    },
  },
];
