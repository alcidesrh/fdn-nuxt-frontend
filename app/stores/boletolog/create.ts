import type { CreateItemData } from '~/types/api';
import type { BoletoLog } from '~/types/boletolog';
import type { SubmissionErrors } from '~/types/error';
import { defineStore } from 'pinia';

interface State {
	created?: BoletoLog;
	isLoading: boolean;
	error?: string;
	violations?: SubmissionErrors;
}

export const useBoletoLogCreateStore = defineStore('boletologCreate', {
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
		}: CreateItemData<BoletoLog>) {
			this.setCreated(created.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setCreated(created?: BoletoLog) {
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
