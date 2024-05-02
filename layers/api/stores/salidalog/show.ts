import { defineStore } from "pinia";
import type { SalidaLog } from "~~/types/salidalog";
import { FetchItemData } from "~~/types/api";
interface State {
  retrieved?: SalidaLog;
  isLoading: boolean;
  error?: string;
  hubUrl?: URL;
}

export const useSalidaLogShowStore = defineStore("salidalogShow", {
  state: (): State => ({
    retrieved: undefined,
    isLoading: false,
    error: "",
    hubUrl: undefined,
  }),

  actions: {
    setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<SalidaLog>) {
      this.setRetrieved(retrieved.value);
      this.setLoading(isLoading.value);
      this.setHubUrl(hubUrl.value);

      if (error.value instanceof Error) {
        this.setError(error.value?.message);
      }
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    setRetrieved(retrieved?: SalidaLog) {
      this.retrieved = retrieved;
    },

    setHubUrl(hubUrl?: URL) {
      this.hubUrl = hubUrl;
    },

    setError(error?: string) {
      this.error = error;
    },
  },
});
