import type { CreateItemData } from '~/types/api';
import type { Enclave } from '~/types/enclave';
import type { SubmissionErrors } from '~/types/error';
import { defineStore } from 'pinia';

interface State {
	created?: Enclave;
	isLoading: boolean;
	error?: string;
	violations?: SubmissionErrors;
}

export const useEnclaveCreateStore = defineStore('enclaveCreate', {
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
		}: CreateItemData<Enclave>) {
			this.setCreated(created.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setCreated(created?: Enclave) {
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
