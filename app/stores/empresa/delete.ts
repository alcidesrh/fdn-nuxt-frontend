import { defineStore } from "pinia";
import type { Empresa } from "~~/types/empresa";

interface State {
  deleted?: Empresa;
  mercureDeleted?: Empresa;
  isLoading: boolean;
  error?: string;
}

export const useEmpresaDeleteStore = defineStore("empresaDelete", {
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

    setDeleted(deleted: Empresa) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Empresa | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
