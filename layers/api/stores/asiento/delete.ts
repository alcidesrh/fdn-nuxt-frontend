import { defineStore } from "pinia";
import type { Asiento } from "~~/types/asiento";

interface State {
  deleted?: Asiento;
  mercureDeleted?: Asiento;
  isLoading: boolean;
  error?: string;
}

export const useAsientoDeleteStore = defineStore("asientoDelete", {
  state: (): State => ({
    deleted: undefined,
    mercureDeleted: undefined,
    isLoading: false,
    error: undefined,
  }),

  actions: {
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    setDeleted(deleted: Asiento) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Asiento | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
