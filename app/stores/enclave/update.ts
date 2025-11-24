import type { FetchItemData, UpdateItemData } from '~/types/api';
import type { Enclave } from '~/types/enclave';
import type { SubmissionErrors } from '~/types/error';
import { defineStore } from 'pinia';

interface State {
	updated?: Enclave;
	retrieved?: Enclave;
	isLoading: boolean;
	error?: string;
	hubUrl?: URL;
	violations?: SubmissionErrors;
}

export const useEnclaveUpdateStore = defineStore('enclaveUpdate', {
	state: (): State => ({
		updated: undefined,
		retrieved: undefined,
		isLoading: false,
		error: undefined,
		hubUrl: undefined,
		violations: undefined,
	}),

	actions: {
		setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Enclave>) {
			this.setRetrieved(retrieved.value);
			this.setLoading(isLoading.value);
			this.setHubUrl(hubUrl.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setUpdateData({
			updated,
			isLoading,
			error,
			violations,
		}: UpdateItemData<Enclave>) {
			this.setUpdated(updated.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setRetrieved(retrieved?: Enclave) {
			this.retrieved = retrieved;
		},

		setUpdated(updated?: Enclave) {
			this.updated = updated;
		},

		setHubUrl(hubUrl?: URL) {
			this.hubUrl = hubUrl;
		},

		setLoading(isLoading: boolean) {
			this.isLoading = isLoading;
		},

		setError(error?: string) {
			this.error = error;
		},

		setViolations(violations?: SubmissionErrors) {
			this.violations = violations;
		},
	},
});
