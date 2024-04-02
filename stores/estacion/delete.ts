import { defineStore } from "pinia";
import type { Estacion } from "~~/types/estacion";

interface State {
  deleted?: Estacion;
  mercureDeleted?: Estacion;
  isLoading: boolean;
  error?: string;
}

export const useEstacionDeleteStore = defineStore("estacionDelete", {
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

    setDeleted(deleted: Estacion) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: Estacion | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
