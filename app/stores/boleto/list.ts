import type { FetchAllData } from '~/types/api';
import type { Boleto } from '~/types/boleto';
import type { View } from '~/types/view';
import { defineStore } from 'pinia';

interface State {
	items: Boleto[];
	hubUrl?: URL;
	isLoading: boolean;
	view?: View;
	error?: string;
}

export const useBoletoListStore = defineStore('boletoList', {
	state: (): State => ({
		items: [],
		isLoading: false,
		error: undefined,
		hubUrl: undefined,
		view: undefined,
	}),

	actions: {
		setData({ items, view, isLoading, error, hubUrl }: FetchAllData<Boleto>) {
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

		setItems(items: Boleto[]) {
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

		updateItem(updatedItem: Boleto) {
			const item: Boleto | undefined = this.items.find(
				(i) => i['@id'] === updatedItem['@id'],
			);

			if (!item) return;

			Object.assign(item, updatedItem);
		},

		deleteItem(deletedItem: Boleto) {
			this.items = this.items.filter((item) => {
				return item['@id'] !== deletedItem['@id'];
			});
		},
	},
});
