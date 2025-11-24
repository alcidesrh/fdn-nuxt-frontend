import { defineStore } from 'pinia';
import { Estacion } from '~/types/estacion';
import type { SubmissionErrors } from '~/types/error';
import { CreateItemData } from '~/types/api';

interface State {
	created?: Estacion;
	isLoading: boolean;
	error?: string;
	violations?: SubmissionErrors;
}

export const useEstacionCreateStore = defineStore('estacionCreate', {
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
		}: CreateItemData<Estacion>) {
			this.setCreated(created.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setCreated(created?: Estacion) {
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
