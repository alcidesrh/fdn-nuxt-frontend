import { defineStore } from 'pinia';
import type { Permiso } from '~/types/permiso';

interface State {
	deleted?: Permiso;
	mercureDeleted?: Permiso;
	isLoading: boolean;
	error?: string;
}

export const usePermisoDeleteStore = defineStore('permisoDelete', {
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

		setDeleted(deleted: Permiso) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: Permiso | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
