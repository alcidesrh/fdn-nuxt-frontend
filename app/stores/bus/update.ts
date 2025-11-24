import { defineStore } from 'pinia';
import type { Bus } from '~/types/bus';
import type { SubmissionErrors } from '~/types/error';
import { FetchItemData, UpdateItemData } from '~/types/api';

interface State {
	updated?: Bus;
	retrieved?: Bus;
	isLoading: boolean;
	error?: string;
	hubUrl?: URL;
	violations?: SubmissionErrors;
}

export const useBusUpdateStore = defineStore('busUpdate', {
	state: (): State => ({
		updated: undefined,
		retrieved: undefined,
		isLoading: false,
		error: undefined,
		hubUrl: undefined,
		violations: undefined,
	}),

	actions: {
		setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Bus>) {
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
		}: UpdateItemData<Bus>) {
			this.setUpdated(updated.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setRetrieved(retrieved?: Bus) {
			this.retrieved = retrieved;
		},

		setUpdated(updated?: Bus) {
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
