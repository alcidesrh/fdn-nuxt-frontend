export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) return {};

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
    "auth",
    async (to, from) => {
      const store = useUserSessionStore();
      const { user } = store;

      if (to.meta.auth && !user && to.name != "Login") {
        store.redirectTo = to.path;
        return "/login";
      } else if (user && !(to.name == "Login" && store.authErrorAttempts)) {
        store.ch++;
        (API_DEFAULT_OPTIONS.headers as Record<any, any>) = {
          Authorization: `Bearer ${user.token}`,
        };
        const resp = await $fetch("/auth", {
          ...API_DEFAULT_OPTIONS,
        });
        if (resp.error && resp.error.value) {
          if (to.name != "Login") {
            store.redirectTo = to.path;
            return "/login";
          }
        } else if (to.name === "Login") {
          store.authErrorAttempts = 0;
          return navigateTo("/", { redirectCode: 301 });
        }
      }
    },
    { global: true }
  );

  // return {
  //   provide: {
  //     auth: {
  //       redirectTo,
  //     },
  //   },
  // }
});
