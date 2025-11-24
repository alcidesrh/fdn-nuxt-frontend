import type { CreateItemData } from '~/types/api';
import type { SubmissionErrors } from '~/types/error';
import type { Taxon } from '~/types/taxon';
import { defineStore } from 'pinia';

interface State {
	created?: Taxon;
	isLoading: boolean;
	error?: string;
	violations?: SubmissionErrors;
}

export const useTaxonCreateStore = defineStore('taxonCreate', {
	state: (): State => ({
		created: undefined,
		isLoading: false,
		error: undefined,
		violations: undefined,
	}),

	actions: {
		setData({ created, isLoading, error, violations }: CreateItemData<Taxon>) {
			this.setCreated(created.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setCreated(created?: Taxon) {
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
