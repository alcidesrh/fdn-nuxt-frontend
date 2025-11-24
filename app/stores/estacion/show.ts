import { defineStore } from 'pinia';
import type { Estacion } from '~/types/estacion';
import { FetchItemData } from '~/types/api';
interface State {
	retrieved?: Estacion;
	isLoading: boolean;
	error?: string;
	hubUrl?: URL;
}

export const useEstacionShowStore = defineStore('estacionShow', {
	state: (): State => ({
		retrieved: undefined,
		isLoading: false,
		error: '',
		hubUrl: undefined,
	}),

	actions: {
		setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Estacion>) {
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

		setRetrieved(retrieved?: Estacion) {
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
