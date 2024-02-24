import { defineStore } from "pinia";
import type { Ruta } from "~~/types/ruta";

interface State {
  deleted?: Ruta;
  mercureDeleted?: Ruta;
  isLoading: boolean;
  error?: string;
}

export const useRutaDeleteStore = defineStore("rutaDelete", {
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

    setDeleted(deleted: Ruta) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Ruta | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
