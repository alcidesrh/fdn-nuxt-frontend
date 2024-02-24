import AuthSession from '~/types/auth_session'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error)
    return {}

  const store = useUserSessionStore()

  const { user } = store

  if (user) {

    const { data: session, refresh: updateSession } = await useFetch<AuthSession>('/auth', {
      onRequest({ request, options }) {
        // Set the request headers
        options.headers = {
          ...(options.headers || {}), ...{
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/json'
          }
        }
      }
    })
  }

  // Create a ref to know where to redirect the user when logged in
  const redirectTo = useState('authRedirect')

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
    (to) => {
      if (to.meta.auth && !user) {
        redirectTo.value = to.path
        return '/login'
      }
    },
    { global: true },
  )

  const currentRoute = useRoute()

  watch(user, async (user) => {
    if (!user && currentRoute.meta.auth) {
      redirectTo.value = currentRoute.path
      await navigateTo('/login')
    }
  })

  if (user && currentRoute.path === '/login')
    await navigateTo(redirectTo.value || '/')

  return {
    provide: {
      auth: {
        redirectTo,
      },
    },
  }
})
