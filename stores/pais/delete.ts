import { defineStore } from "pinia";
import type { Pais } from "~~/types/pais";

interface State {
  deleted?: Pais;
  mercureDeleted?: Pais;
  isLoading: boolean;
  error?: string;
}

export const usePaisDeleteStore = defineStore("paisDelete", {
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

    setDeleted(deleted: Pais) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Pais | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
