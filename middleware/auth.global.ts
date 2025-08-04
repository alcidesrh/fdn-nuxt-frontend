import { FetchError } from 'ofetch';
export default defineNuxtRouteMiddleware(async (to, from) => {
    {
        const store = useUserSessionStore();
        const { user } = store;

        if (to.meta.auth && !user && to.name != 'Login') {
            store.redirectTo = to.path;
            return '/login';
        } else if (user?.token && !(to.name == 'Login' && store.authErrorAttempts)) {
            (API_DEFAULT_OPTIONS.headers as Record<any, any>) = {
                Authorization: `Bearer ${user.token}`
            };

            const resp = await $fetch('/auth', {
                ...API_DEFAULT_OPTIONS
            }).catch((e: FetchError) => e);

            if (!resp.token && resp.response && !resp.response.ok) {
                if (resp.statusCode == 401) {
                    user.token = user.username = '';
                    // }
                    // if (to.name != 'Login') {
                    store.redirectTo = to.path;
                    return '/login';
                }
            } else if (to.name === 'Login') {
                store.authErrorAttempts = 0;
                return navigateTo('/', { redirectCode: 301 });
            }
        } else if (!user?.token && to.name != 'Login') {
            store.authErrorAttempts = 1;
            store.redirectTo = to.path;
            return '/login';
        }
    }
});
