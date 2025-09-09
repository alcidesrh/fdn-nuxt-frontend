import { defineStore } from "pinia";
import type { Boleto } from "~~/types/boleto";

interface State {
  deleted?: Boleto;
  mercureDeleted?: Boleto;
  isLoading: boolean;
  error?: string;
}

export const useBoletoDeleteStore = defineStore("boletoDelete", {
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

    setDeleted(deleted: Boleto) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Boleto | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
