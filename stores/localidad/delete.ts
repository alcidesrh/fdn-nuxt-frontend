import { defineStore } from "pinia";
import type { Localidad } from "~~/types/localidad";

interface State {
  deleted?: Localidad;
  mercureDeleted?: Localidad;
  isLoading: boolean;
  error?: string;
}

export const useLocalidadDeleteStore = defineStore("localidadDelete", {
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

    setDeleted(deleted: Localidad) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Localidad | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
