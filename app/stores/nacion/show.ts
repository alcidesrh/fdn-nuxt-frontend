import { defineStore } from 'pinia';
import type { Nacion } from '~/types/nacion';
import { FetchItemData } from '~/types/api';
interface State {
	retrieved?: Nacion;
	isLoading: boolean;
	error?: string;
	hubUrl?: URL;
}

export const useNacionShowStore = defineStore('nacionShow', {
	state: (): State => ({
		retrieved: undefined,
		isLoading: false,
		error: '',
		hubUrl: undefined,
	}),

	actions: {
		setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Nacion>) {
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

		setRetrieved(retrieved?: Nacion) {
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
