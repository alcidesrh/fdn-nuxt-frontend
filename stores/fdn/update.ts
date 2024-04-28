import { defineStore } from "pinia";
import type { FDN } from "~~/types/fdn";
import type { SubmissionErrors } from "~~/types/error";
import { FetchItemData, UpdateItemData } from "~~/types/api";

interface State {
  updated?: FDN;
  retrieved?: FDN;
  isLoading: boolean;
  error?: string;
  hubUrl?: URL;
  violations?: SubmissionErrors;
}

export const useFDNUpdateStore = defineStore("fdnUpdate", {
  state: (): State => ({
    updated: undefined,
    retrieved: undefined,
    isLoading: false,
    error: undefined,
    hubUrl: undefined,
    violations: undefined,
  }),

  actions: {
    setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<FDN>) {
      this.setRetrieved(retrieved.value);
      this.setLoading(isLoading.value);
      this.setHubUrl(hubUrl.value);

      if (error.value instanceof Error) {
        this.setError(error.value?.message);
      }
    },

    setUpdateData({
      updated,
      isLoading,
      error,
      violations,
    }: UpdateItemData<FDN>) {
      this.setUpdated(updated.value);
      this.setLoading(isLoading.value);
      this.setViolations(violations.value);

      if (error.value instanceof Error) {
        this.setError(error.value?.message);
      }
    },

    setRetrieved(retrieved?: FDN) {
      this.retrieved = retrieved;
    },

    setUpdated(updated?: FDN) {
      this.updated = updated;
    },

    setHubUrl(hubUrl?: URL) {
      this.hubUrl = hubUrl;
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    setError(error?: string) {
      this.error = error;
    },

    setViolations(violations?: SubmissionErrors) {
      this.violations = violations;
    },
  },
});
