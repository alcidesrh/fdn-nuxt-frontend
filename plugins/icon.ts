import '@icon-park/vue-next/styles/index.css'
import { install } from '@icon-park/vue-next/es/all'
export default defineNuxtPlugin((nuxtApp) => {
  install(nuxtApp.vueApp)
})
