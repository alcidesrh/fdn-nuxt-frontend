
export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error)
    return {}



  // Create a ref to know where to redirect the user when logged in
  // const redirectTo = useState('authRedirect')

  /**
   * Add global route middleware to protect pages using:
   *
   * definePageMeta({
   *  auth: true
   * })
   */
  //

  addRouteMiddleware(
    'auth',
    async (to) => {

      const store = useUserSessionStore()
      const { user } = store

      if (to.meta.auth && !user) {
        store.redirectTo = to.path
        return '/login'
      }


      if (user) {

        (API_DEFAULT_OPTIONS.headers as Record<any, any>) = { Authorization: `Bearer ${user.token}` }
        await useFetch('/auth', {
          ...API_DEFAULT_OPTIONS,
          // onResponseError({ response: { _data } }) {
          //   alert(333)
          //   throw new Error(error);
          // },
          onResponse({ response: { _data } }) {
            console.log(_data);


          }

        })
      }
    },
    { global: true },
  )

  const currentRoute = useRoute()

  // watch(user, async (user) => {
  //   if (!user && currentRoute.meta.auth) {
  //     redirectTo.value = currentRoute.path
  //     await navigateTo('/login')
  //   }
  // })

  // if (user && currentRoute.path === '/login')
  //   await navigateTo(redirectTo.value || '/')

  // return {
  //   provide: {
  //     auth: {
  //       redirectTo,
  //     },
  //   },
  // }
})
