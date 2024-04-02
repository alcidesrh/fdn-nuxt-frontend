import { defineStore } from "pinia";
import { Boleto } from "~~/types/boleto";
import type { SubmissionErrors } from "~~/types/error";
import { CreateItemData } from "~~/types/api";

interface State {
  created?: Boleto;
  isLoading: boolean;
  error?: string;
  violations?: SubmissionErrors;
}

export const useBoletoCreateStore = defineStore("boletoCreate", {
  state: (): State => ({
    created: undefined,
    isLoading: false,
    error: undefined,
    violations: undefined,
  }),

  actions: {
    setData({ created, isLoading, error, violations }: CreateItemData<Boleto>) {
      this.setCreated(created.value);
      this.setLoading(isLoading.value);
      this.setViolations(violations.value);

      if (error.value instanceof Error) {
        this.setError(error.value?.message);
      }
    },

    setCreated(created?: Boleto) {
      this.created = created;
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
