import { defineStore } from "pinia";
import type { MenuItem } from "~~/types/menuitem";
import { FetchItemData } from "~~/types/api";
interface State {
  retrieved?: MenuItem;
  isLoading: boolean;
  error?: string;
  hubUrl?: URL;
}

export const useMenuItemShowStore = defineStore("menuitemShow", {
  state: (): State => ({
    retrieved: undefined,
    isLoading: false,
    error: "",
    hubUrl: undefined,
  }),

  actions: {
    setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<MenuItem>) {
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

    setRetrieved(retrieved?: MenuItem) {
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
