// @unocss-include
export default [
  {
    $el: 'h1',
    children: 'Acceso Restringido',
    attrs: {
      class: 'text-xl font-semibold text-slate-100 mb-8 text-center',
      style: 'font-variation-settings: "slnt" 0, "GRAD" -3, "XTRA" 432, "YOPQ" 106, "YTAS" 771, "YTDE" -268, "YTFI" 560, "YTLC" 514, "YTUC" 722; font-weight: 500; font-style: normal; font-stretch: 147.4 %; font-size:30px'
    },
  },
  {
    $formkit: 'text',
    name: 'username',
    label: 'Usuario',
    validation: 'required',
    labelClass: 'text-white',
    messageClass: '!text-orange-200'

  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Contraseña',
    validation: 'required',
    labelClass: 'text-white',
    messageClass: '!text-orange-200'
  },
  {
    $formkit: 'submit',
    name: 'submit',
    label: 'Aceptar',
    classes: {
      wrapper: 'flex justify-end mt-8',
      input: 'bg-slate-100 !text-slate-600 border-slate-400 hover:bg-slate-300',
    }
  },
]
