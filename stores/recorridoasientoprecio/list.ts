import { defineStore } from "pinia";
import { RecorridoAsientoPrecio } from "~~/types/recorridoasientoprecio";
import { View } from "~~/types/view";
import { FetchAllData } from "~~/types/api";

interface State {
  items: RecorridoAsientoPrecio[];
  hubUrl?: URL;
  isLoading: boolean;
  view?: View;
  error?: string;
}

export const useRecorridoAsientoPrecioListStore = defineStore(
  "recorridoasientoprecioList",
  {
    state: (): State => ({
      items: [],
      isLoading: false,
      error: undefined,
      hubUrl: undefined,
      view: undefined,
    }),

    actions: {
      setData({
        items,
        view,
        isLoading,
        error,
        hubUrl,
      }: FetchAllData<RecorridoAsientoPrecio>) {
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

      setItems(items: RecorridoAsientoPrecio[]) {
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

      updateItem(updatedItem: RecorridoAsientoPrecio) {
        const item: RecorridoAsientoPrecio | undefined = this.items.find(
          (i) => i["@id"] === updatedItem["@id"]
        );

        if (!item) return;

        Object.assign(item, updatedItem);
      },

      deleteItem(deletedItem: RecorridoAsientoPrecio) {
        this.items = this.items.filter((item) => {
          return item["@id"] !== deletedItem["@id"];
        });
      },
    },
  }
);
