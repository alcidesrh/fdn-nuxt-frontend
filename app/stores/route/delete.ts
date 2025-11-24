import { defineStore } from 'pinia';
import type { Route } from '~/types/route';

interface State {
	deleted?: Route;
	mercureDeleted?: Route;
	isLoading: boolean;
	error?: string;
}

export const useRouteDeleteStore = defineStore('routeDelete', {
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

		setDeleted(deleted: Route) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: Route | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
