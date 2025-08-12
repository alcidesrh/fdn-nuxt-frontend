import { User } from '~/graphql/typed-api';
import { useUserSessionStore } from '~/stores/session';
// import { createPinia } from 'pinia';

export const useAuth = () => useNuxtApp().$auth;
// const pinia = createPinia();
// useNuxtApp().vueApp.use(pinia);
// cl(useAuth());
// const store = useUserSessionStore();
// export const { user } = store;
export const user: Ref<User> = ref();

export const authLogin = async (email: string, password: string) => {
    await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
            email: email,
            password: password
        }
    });
    useAuth().redirectTo.value = null;
    await useAuth().updateSession();
    await navigateTo(useAuth().redirectTo.value || '/');
};

export const authRegister = async (email: string, password: string) => {
    await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
            email: email,
            password: password
        }
    });
    return await authLogin(email, password);
};

export const authLogout = async () => {
    await $fetch('/api/auth/logout', {
        method: 'POST'
    });
    await useAuth().updateSession();
};
