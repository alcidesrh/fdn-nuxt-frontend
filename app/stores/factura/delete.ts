import type { Factura } from '~/types/factura';
import { defineStore } from 'pinia';

interface State {
	deleted?: Factura;
	mercureDeleted?: Factura;
	isLoading: boolean;
	error?: string;
}

export const useFacturaDeleteStore = defineStore('facturaDelete', {
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

		setDeleted(deleted: Factura) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: Factura | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
