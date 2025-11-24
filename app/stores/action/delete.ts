import { defineStore } from 'pinia';
import type { Action } from '~/types/action';

interface State {
	deleted?: Action;
	mercureDeleted?: Action;
	isLoading: boolean;
	error?: string;
}

export const useActionDeleteStore = defineStore('actionDelete', {
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

		setDeleted(deleted: Action) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: Action | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
