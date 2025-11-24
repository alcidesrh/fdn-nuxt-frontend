import type { Agencia } from '~/types/agencia';
import type { FetchAllData } from '~/types/api';
import type { View } from '~/types/view';
import { defineStore } from 'pinia';

interface State {
	items: Agencia[];
	hubUrl?: URL;
	isLoading: boolean;
	view?: View;
	error?: string;
}

export const useAgenciaListStore = defineStore('agenciaList', {
	state: (): State => ({
		items: [],
		isLoading: false,
		error: undefined,
		hubUrl: undefined,
		view: undefined,
	}),

	actions: {
		setData({ items, view, isLoading, error, hubUrl }: FetchAllData<Agencia>) {
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

		setItems(items: Agencia[]) {
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

		updateItem(updatedItem: Agencia) {
			const item: Agencia | undefined = this.items.find(
				(i) => i['@id'] === updatedItem['@id'],
			);

			if (!item) return;

			Object.assign(item, updatedItem);
		},

		deleteItem(deletedItem: Agencia) {
			this.items = this.items.filter((item) => {
				return item['@id'] !== deletedItem['@id'];
			});
		},
	},
});
