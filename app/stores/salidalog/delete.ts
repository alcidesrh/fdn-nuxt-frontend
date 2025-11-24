import type { SalidaLog } from '~/types/salidalog';
import { defineStore } from 'pinia';

interface State {
	deleted?: SalidaLog;
	mercureDeleted?: SalidaLog;
	isLoading: boolean;
	error?: string;
}

export const useSalidaLogDeleteStore = defineStore('salidalogDelete', {
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

		setDeleted(deleted: SalidaLog) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: SalidaLog | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
