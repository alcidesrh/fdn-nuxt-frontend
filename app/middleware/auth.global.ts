import { FetchError } from "ofetch";
import type { User } from "~/types/user";
import { useUserSessionStore } from "~/stores/session";

export default defineNuxtRouteMiddleware(async (to, from) => {
  {
    const store = useUserSessionStore();
    const { user } = store as Ref<Record<"user", User>>;

    if (!user?.token && to.name != "Login") {
      store.authErrorAttempts = 1;
      store.redirectTo = to.path;
      return "/login";
    } else if (
      user?.token &&
      !(to.name == "Login" && store.authErrorAttempts)
    ) {
      const { breadcrumbReload } = useBreadcrumb();
      breadcrumbReload(to);
      return;
      // let redirect = "";
      // if (typeof API_DEFAULT_OPTIONS.headers?.Authorization === "undefined") {
      //   (API_DEFAULT_OPTIONS.headers as Record<any, any>) = {
      //     Authorization: `Bearer ${user.token}`,
      //   };
      // }
      // await $fetch("/auth", {
      //   ...API_DEFAULT_OPTIONS,
      // })
      //   .then((resp: any) => {
      //     if (!resp.token && resp.response && !resp.response.ok) {
      //       if (resp.statusCode == 401) {
      //         store.$reset();

      //         store.redirectTo = to.path;
      //         return "/login";
      //       }
      //     } else if (to.name === "Login") {
      //       store.authErrorAttempts = 0;
      //       return navigateTo("/", { redirectCode: 301 });
      //     }

      //     const { breadcrumbReload } = useBreadcrumb();
      //     breadcrumbReload(to);
      //   })
      //   .catch((e: FetchError) => {
      //     store.$reset();
      //     redirect = "/login";
      //   });
      // if (redirect) {
      //   return navigateTo(redirect, { redirectCode: 301 });
      // }
    }
  }
});
