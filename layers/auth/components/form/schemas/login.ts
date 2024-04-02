// @unocss-include
export default [
  {
    $el: "div",
    children: "Iniciar Sessión",
    attrs: {
      class: "u-text-l font-semibold  mb-8 text-center",
      style:
        'font-variation-settings: "slnt" 0, "GRAD" -3, "XTRA" 432, "YOPQ" 106, "YTAS" 771, "YTDE" -268, "YTFI" 560, "YTLC" 514, "YTUC" 722; font-weight: 500; font-style: normal; font-stretch: 147.4 %;',
    },
  },
  {
    $formkit: "text",
    name: "username",
    label: "Usuario",
    validation: "required",
    labelClass: "u-text-m text-slate-700",
  },
  {
    $formkit: "password",
    name: "password",
    label: "Contraseña",
    validation: "required",
    labelClass: "u-text-m text-slate-700",
  },
  {
    $formkit: "submit",
    name: "submit",
    label: "Aceptar",
    classes: {
      wrapper: "flex justify-end mt-8",
      input: "",
    },
  },
];
