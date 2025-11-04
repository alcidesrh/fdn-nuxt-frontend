export default defineNuxtPlugin((nuxtApp) => {
	const api = $fetch.create({
		...API_DEFAULT_OPTIONS,
		onRequest({ request, options, error }) {
			const { user } = useUserSessionStore();
			if (user.token) {
				options.headers.set('Authorization', `Bearer ${user.token}`);
			}
		},
		async onResponseError({ response }) {
			if (response.status === 401) {
				await nuxtApp.runWithContext(() => navigateTo('/login'));
			}
		},
	});

	// Expose to useNuxtApp().$api
	return {
		provide: {
			api,
		},
	};
});
