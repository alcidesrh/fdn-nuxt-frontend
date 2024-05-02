import { defineStore } from "pinia";
import type { Agencia } from "~~/types/agencia";

interface State {
  deleted?: Agencia;
  mercureDeleted?: Agencia;
  isLoading: boolean;
  error?: string;
}

export const useAgenciaDeleteStore = defineStore("agenciaDelete", {
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

    setDeleted(deleted: Agencia) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Agencia | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
