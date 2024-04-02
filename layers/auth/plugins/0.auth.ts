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
    async (to) => {
      const store = useUserSessionStore();
      const { user } = store;
      if (to.meta.auth && !user) {
        store.redirectTo = to.path;
        return "/login";
      } else if (user) {
        (API_DEFAULT_OPTIONS.headers as Record<any, any>) = {
          Authorization: `Bearer ${user.token}`,
        };
        const resp = await useFetch("/auth", {
          ...API_DEFAULT_OPTIONS,
          // onResponseError({ response: { _data } }) {
          //   alert(333)
          //   throw new Error(error);
          // },
          // onResponseError({ response: { _data } }) {
          // if (_data.error) {
          //   // store.redirectTo = to.path;
          //   return "/login";
          // }
          // },
        });
        if (resp.error && resp.error.value) {
          // store.$reset();
          store.redirectTo = to.path;
          return "/login";
        } else if (to.name === "Login") {
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
