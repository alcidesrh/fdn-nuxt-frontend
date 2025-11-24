import type { FetchItemData } from '~/types/api';
import type { Taxon } from '~/types/taxon';
import { defineStore } from 'pinia';

interface State {
	retrieved?: Taxon;
	isLoading: boolean;
	error?: string;
	hubUrl?: URL;
}

export const useTaxonShowStore = defineStore('taxonShow', {
	state: (): State => ({
		retrieved: undefined,
		isLoading: false,
		error: '',
		hubUrl: undefined,
	}),

	actions: {
		setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Taxon>) {
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

		setRetrieved(retrieved?: Taxon) {
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
