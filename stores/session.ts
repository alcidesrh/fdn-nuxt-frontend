import { defineStore } from 'pinia';
import type { SubmissionErrors } from '~/types/error';
// import { UserItemData } from '~/types/api';
// import type { Config } from './Qu                                                ickTypes';
import { User } from '~/types/user';

export interface setUserSession {
    username?: string;
    apiTokens?: string;
    uri?: string;
}
interface State {
    user?: User;
    isLoading: boolean;
    redirectTo?: string;
    error?: string;
    violations?: SubmissionErrors;
    // config?: Config;
    authErrorAttempts: Number;
}

export const useUserSessionStore = defineStore('userSession', {
    persist: true,
    state: (): State => ({
        user: undefined,
        isLoading: false,
        error: undefined,
        violations: undefined,
        authErrorAttempts: 0,
        config: {
            sidebar: {
                h_opened: true,
                v_opened: true
            }
        }
    }),

    actions: {
        setData({ user, isLoading, error, violations }: UserItemData<User>) {
            this.setUserd(user.value);
            this.setLoading(isLoading.value);
            this.setViolations(violations.value);

            if (error.value instanceof Error) {
                this.setError(error.value?.message);
            }
        },

        setUserSession(user?: User) {
            this.user = user;
            this.isLogin = true;
        },

        setLoading(isLoading: boolean) {
            this.isLoading = isLoading;
        },

        setError(error: string | undefined) {
            this.error = error;
        },

        setViolations(violations: SubmissionErrors | undefined) {
            this.violations = violations;
        }
    }
});
