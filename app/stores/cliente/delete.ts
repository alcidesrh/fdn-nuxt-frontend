import { defineStore } from "pinia";
import type { Cliente } from "~~/types/cliente";

interface State {
  deleted?: Cliente;
  mercureDeleted?: Cliente;
  isLoading: boolean;
  error?: string;
}

export const useClienteDeleteStore = defineStore("clienteDelete", {
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

    setDeleted(deleted: Cliente) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Cliente | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
