import { defineStore } from "pinia";
import { Factura } from "~~/types/factura";
import { View } from "~~/types/view";
import { FetchAllData } from "~~/types/api";

interface State {
  items: Factura[];
  hubUrl?: URL;
  isLoading: boolean;
  view?: View;
  error?: string;
}

export const useFacturaListStore = defineStore("facturaList", {
  state: (): State => ({
    items: [],
    isLoading: false,
    error: undefined,
    hubUrl: undefined,
    view: undefined,
  }),

  actions: {
    setData({ items, view, isLoading, error, hubUrl }: FetchAllData<Factura>) {
      this.setItems(items.value);
      this.setLoading(isLoading.value);
      if (hubUrl) this.setHubUrl(hubUrl.value);
      if (view) this.setView(view.value);

      if (error.value instanceof Error) {
        this.setError(error.value?.message);
      }
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    setItems(items: Factura[]) {
      this.items = items;
    },

    setHubUrl(hubUrl?: URL) {
      this.hubUrl = hubUrl;
    },

    setView(view?: View) {
      this.view = view;
    },

    setError(error?: string) {
      this.error = error;
    },

    updateItem(updatedItem: Factura) {
      const item: Factura | undefined = this.items.find(
        (i) => i["@id"] === updatedItem["@id"]
      );

      if (!item) return;

      Object.assign(item, updatedItem);
    },

    deleteItem(deletedItem: Factura) {
      this.items = this.items.filter((item) => {
        return item["@id"] !== deletedItem["@id"];
      });
    },
  },
});
