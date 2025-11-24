import { defineStore } from 'pinia';
import type { Nacion } from '~/types/nacion';

interface State {
	deleted?: Nacion;
	mercureDeleted?: Nacion;
	isLoading: boolean;
	error?: string;
}

export const useNacionDeleteStore = defineStore('nacionDelete', {
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

		setDeleted(deleted: Nacion) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: Nacion | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
