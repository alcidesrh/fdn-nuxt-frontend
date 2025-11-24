import { defineStore } from 'pinia';
import type { Menu } from '~/types/menu';

interface State {
	deleted?: Menu;
	mercureDeleted?: Menu;
	isLoading: boolean;
	error?: string;
}

export const useMenuDeleteStore = defineStore('menuDelete', {
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

		setDeleted(deleted: Menu) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: Menu | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
