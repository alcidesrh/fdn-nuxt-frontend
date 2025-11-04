import type { User } from '~/graphql/typed-api';
// import { createPinia } from 'pinia';

export const useAuth = () => useNuxtApp().$auth;

// const pinia = createPinia();
// useNuxtApp().vueApp.use(pinia);
// const store = useUserSessionStore();
// export const { user } = store;
export const user: Ref<User> = ref();

export async function authLogin(email: string, password: string) {
	await $fetch('/api/auth/login', {
		method: 'POST',
		body: {
			email,
			password
		}
	});
	useAuth().redirectTo.value = null;
	await useAuth().updateSession();
	await navigateTo(useAuth().redirectTo.value || '/');
}

export async function authRegister(email: string, password: string) {
	await $fetch('/api/auth/register', {
		method: 'POST',
		body: {
			email,
			password
		}
	});
	return await authLogin(email, password);
}

export async function authLogout() {
	await $fetch('/api/auth/logout', {
		method: 'POST'
	});
	await useAuth().updateSession();
}
