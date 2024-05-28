import { defineStore } from "pinia";
import type { Recorrido } from "~~/types/recorrido";

interface State {
  deleted?: Recorrido;
  mercureDeleted?: Recorrido;
  isLoading: boolean;
  error?: string;
}

export const useRecorridoDeleteStore = defineStore("recorridoDelete", {
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

    setDeleted(deleted: Recorrido) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Recorrido | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
