import { defineStore } from 'pinia';
import type { Route } from '~/types/route';
import { FetchItemData } from '~/types/api';
interface State {
	retrieved?: Route;
	isLoading: boolean;
	error?: string;
	hubUrl?: URL;
}

export const useRouteShowStore = defineStore('routeShow', {
	state: (): State => ({
		retrieved: undefined,
		isLoading: false,
		error: '',
		hubUrl: undefined,
	}),

	actions: {
		setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Route>) {
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

		setRetrieved(retrieved?: Route) {
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
