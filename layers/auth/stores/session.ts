import { defineStore } from "pinia";
// import { User } from "~~/api/types/user";
import type { SubmissionErrors } from "~/api/types/error";
import { UserItemData } from "~/api/types/api";

export interface setUserSession {
  username?: string;
  apiTokens?: string;
  uri?: string;
}
interface State {
  user?: User;
  isLoading: boolean;
  error?: string;
  violations?: SubmissionErrors;
}

export const useUserSessionStore = defineStore("userSession", {
  persist: true,
  state: (): State => ({
    user: undefined,
    isLoading: false,
    error: undefined,
    violations: undefined,
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
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    setError(error: string | undefined) {
      this.error = error;
    },

    setViolations(violations: SubmissionErrors | undefined) {
      this.violations = violations;
    },
  },
});
