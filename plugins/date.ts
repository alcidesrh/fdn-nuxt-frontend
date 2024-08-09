export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.vueApp.use(apolloProvider)
  // nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
  nuxtApp.vueApp.config.globalProperties.$dateFormat = (v: string) => {
    // retrieve a nested property in `options`
    // using `key` as the path
    return useDateFormat(v, 'DD-MM-YYYY hh:mm:ss a')
  }
  // const plugin = {
  //   install: (app, options) => {
  //     nuxtApp.vueApp.config.globalProperties.$dateFormat = (key: string) => {
  //       // retrieve a nested property in `options`
  //       // using `key` as the path
  //       return 'sirvio'
  //     }
  //   },
  // }
  // nuxtApp.vueApp.use(plugin)
})
