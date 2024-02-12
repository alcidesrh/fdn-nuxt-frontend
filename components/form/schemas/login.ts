export default [
  {
    $el: 'h1',
    children: 'Iniciar Sessión',
    attrs: {
      class: 'text-2xl font-bold mb-4 ',
    },
  },
  {
    $formkit: 'text',
    name: 'username',
    label: 'Usuario',
    validation: 'required',
  },
  {
    $formkit: 'password',
    name: 'password',
    label: 'Contraseña',
    validation: 'required',
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
