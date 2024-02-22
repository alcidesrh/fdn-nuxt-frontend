import { defineStore } from "pinia";
import type { User } from "~~/types/user";
import type { SubmissionErrors } from "~~/types/error";
import type { CreateItemData } from "~~/types/api";

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
    setData({ user: User, isLoading, error, violations }: CreateItemData<User>) {
      this.setUser(user.value);
      this.setLoading(isLoading.value);
      this.setViolations(violations.value);

      if (error.value instanceof Error) {
        this.setError(error.value?.message);
      }
    },

    setUser(user?: User) {
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
