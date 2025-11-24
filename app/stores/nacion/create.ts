import { defineStore } from 'pinia';
import { Nacion } from '~/types/nacion';
import type { SubmissionErrors } from '~/types/error';
import { CreateItemData } from '~/types/api';

interface State {
	created?: Nacion;
	isLoading: boolean;
	error?: string;
	violations?: SubmissionErrors;
}

export const useNacionCreateStore = defineStore('nacionCreate', {
	state: (): State => ({
		created: undefined,
		isLoading: false,
		error: undefined,
		violations: undefined,
	}),

	actions: {
		setData({ created, isLoading, error, violations }: CreateItemData<Nacion>) {
			this.setCreated(created.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setCreated(created?: Nacion) {
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
