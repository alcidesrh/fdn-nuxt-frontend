import type { FetchItemData } from '~/types/api';
import type { Salida } from '~/types/salida';
import { defineStore } from 'pinia';

interface State {
	retrieved?: Salida;
	isLoading: boolean;
	error?: string;
	hubUrl?: URL;
}

export const useSalidaShowStore = defineStore('salidaShow', {
	state: (): State => ({
		retrieved: undefined,
		isLoading: false,
		error: '',
		hubUrl: undefined,
	}),

	actions: {
		setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Salida>) {
			this.setRetrieved(retrieved.value);
			this.setLoading(isLoading.value);
			this.setHubUrl(hubUrl.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setLoading(isLoading: boolean) {
			this.isLoading = isLoading;
		},

		setRetrieved(retrieved?: Salida) {
			this.retrieved = retrieved;
		},

		setHubUrl(hubUrl?: URL) {
			this.hubUrl = hubUrl;
		},

		setError(error?: string) {
			this.error = error;
		},
	},
});
