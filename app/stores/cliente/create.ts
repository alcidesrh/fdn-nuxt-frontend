import type { CreateItemData } from '~/types/api';
import type { Cliente } from '~/types/cliente';
import type { SubmissionErrors } from '~/types/error';
import { defineStore } from 'pinia';

interface State {
	created?: Cliente;
	isLoading: boolean;
	error?: string;
	violations?: SubmissionErrors;
}

export const useClienteCreateStore = defineStore('clienteCreate', {
	state: (): State => ({
		created: undefined,
		isLoading: false,
		error: undefined,
		violations: undefined,
	}),

	actions: {
		setData({
			created,
			isLoading,
			error,
			violations,
		}: CreateItemData<Cliente>) {
			this.setCreated(created.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setCreated(created?: Cliente) {
			this.created = created;
		},

		setLoading(isLoading: boolean) {
			this.isLoading = isLoading;
		},

		setError(error: string | undefined) {
			this.error = error;
		},

		setViolations(violations: SubmissionErrors | undefined) {
			this.violations = violations;
		},
	},
});
