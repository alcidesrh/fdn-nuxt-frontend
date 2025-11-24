import { defineStore } from 'pinia';
import type { Bus } from '~/types/bus';

interface State {
	deleted?: Bus;
	mercureDeleted?: Bus;
	isLoading: boolean;
	error?: string;
}

export const useBusDeleteStore = defineStore('busDelete', {
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

		setDeleted(deleted: Bus) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: Bus | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
