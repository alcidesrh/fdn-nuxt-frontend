import { defineStore } from "pinia";
import type { MenuItem } from "~~/types/menuitem";

interface State {
  deleted?: MenuItem;
  mercureDeleted?: MenuItem;
  isLoading: boolean;
  error?: string;
}

export const useMenuItemDeleteStore = defineStore("menuitemDelete", {
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

    setDeleted(deleted: MenuItem) {
      this.deleted = deleted;
    },

    setMercureDeleted(mercureDeleted: MenuItem | undefined) {
      this.mercureDeleted = mercureDeleted;
    },

    setError(error: string) {
      this.error = error;
    },
  },
});
