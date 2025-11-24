import { defineStore } from 'pinia';
import type { Role } from '~/types/role';

interface State {
	deleted?: Role;
	mercureDeleted?: Role;
	isLoading: boolean;
	error?: string;
}

export const useRoleDeleteStore = defineStore('roleDelete', {
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

		setDeleted(deleted: Role) {
			this.deleted = deleted;
		},

		setMercureDeleted(mercureDeleted: Role | undefined) {
			this.mercureDeleted = mercureDeleted;
		},

		setError(error: string) {
			this.error = error;
		},
	},
});
