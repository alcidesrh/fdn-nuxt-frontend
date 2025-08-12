import { createPinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp) => {
    // const pinia = createPinia();
    // nuxtApp.vueApp.use(pinia);
    // nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);
    const store = useUserSessionStore();
    const { user } = store;
    return user;
});
