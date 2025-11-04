import type { User } from '~/types/user';
import { useUserSessionStore } from '~/stores/session';

export default defineNuxtRouteMiddleware(async (to, from) => {
	{
		const store = useUserSessionStore();
		const api = useMetadataStore();

		if (store.user && store.user?.token && api.loaded) {
			store.authErrorAttempts = 0;
			const { breadcrumbReload } = useBreadcrumb();
			breadcrumbReload(to);
			if (to.name === 'Login') {
				return navigateTo('/', { redirectCode: 301 });
			}
			return true;
		}
		store.authErrorAttempts++;
		store.redirectTo = from.path !== '/login' ? from.path : '/';
		return to.name === 'Login' ? true : '/login';
	}
});
