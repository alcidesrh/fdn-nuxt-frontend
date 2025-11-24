import type { Parada } from '~/types/parada';
import { defineStore } from 'pinia';

interface State {
	deleted?: Parada;
	mercureDeleted?: Parada;
	isLoading: boolean;
	error?: string;
}

export const useParadaDeleteStore = defineStore('paradaDelete', {
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

		setDeleted(deleted: Parada) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: Parada | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
