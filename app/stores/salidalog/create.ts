import type { CreateItemData } from '~/types/api';
import type { SubmissionErrors } from '~/types/error';
import type { SalidaLog } from '~/types/salidalog';
import { defineStore } from 'pinia';

interface State {
	created?: SalidaLog;
	isLoading: boolean;
	error?: string;
	violations?: SubmissionErrors;
}

export const useSalidaLogCreateStore = defineStore('salidalogCreate', {
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
		}: CreateItemData<SalidaLog>) {
			this.setCreated(created.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setCreated(created?: SalidaLog) {
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
