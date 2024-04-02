import { defineStore } from "pinia";
import type { Salida } from "~~/types/salida";

interface State {
  deleted?: Salida;
  mercureDeleted?: Salida;
  isLoading: boolean;
  error?: string;
}

export const useSalidaDeleteStore = defineStore("salidaDelete", {
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

    setDeleted(deleted: Salida) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Salida | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
