export default [
  {
    $el: 'h1',
    children: 'Acceso Restringido',
    attrs: {
      class: 'text-xl font-semibold mb-4 text-slate-600 mb-8 text-center',
      style: 'font-variation-settings: "slnt" 0, "GRAD" -3, "XTRA" 432, "YOPQ" 106, "YTAS" 771, "YTDE" -268, "YTFI" 560, "YTLC" 514, "YTUC" 722; font-weight: 500; font- style: normal; font- stretch: 147.4 %; font-size:30px'
    },
  },
  {
    $formkit: 'text',
    name: 'username',
    label: 'Usuario',
    validation: 'required',
    labelClass: 'text-slate-600',

  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Contraseña',
    validation: 'required',
    labelClass: 'text-slate-600',

  },
  // {
  //   $cmp: 'FormKit',
  //   props: {
  //     name: 'eu_citizen',
  //     type: 'checkbox',
  //     id: 'eu',
  //     label: 'Olvido los datos?',
  //   },
  // },
  // {
  //   $formkit: 'select',
  //   if: '$get(eu).value', // 👀 Oooo, conditionals!
  //   name: 'cookie_notice',
  //   label: 'Cookie notice frequency',
  //   options: {
  //     refresh: 'Every page load',
  //     hourly: 'Ever hour',
  //     daily: 'Every day',
  //   },
  //   help: 'How often should we display a cookie notice?',
  // },
  {
    $formkit: 'submit',
    name: 'submit',
    label: 'Aceptar',
    classes: {
      wrapper: 'flex justify-end mt-7'
    }
  }

]
