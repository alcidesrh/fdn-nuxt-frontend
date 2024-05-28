import { defineStore } from "pinia";
import type { Piloto } from "~~/types/piloto";

interface State {
  deleted?: Piloto;
  mercureDeleted?: Piloto;
  isLoading: boolean;
  error?: string;
}

export const usePilotoDeleteStore = defineStore("pilotoDelete", {
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

    setDeleted(deleted: Piloto) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Piloto | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
