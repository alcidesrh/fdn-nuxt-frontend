import type { Enclave } from '~/types/enclave';
import { defineStore } from 'pinia';

interface State {
	deleted?: Enclave;
	mercureDeleted?: Enclave;
	isLoading: boolean;
	error?: string;
}

export const useEnclaveDeleteStore = defineStore('enclaveDelete', {
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

		setDeleted(deleted: Enclave) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: Enclave | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
