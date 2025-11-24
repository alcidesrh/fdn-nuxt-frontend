import type { FetchItemData, UpdateItemData } from '~/types/api';
import type { SubmissionErrors } from '~/types/error';
import type { Parada } from '~/types/parada';
import { defineStore } from 'pinia';

interface State {
	updated?: Parada;
	retrieved?: Parada;
	isLoading: boolean;
	error?: string;
	hubUrl?: URL;
	violations?: SubmissionErrors;
}

export const useParadaUpdateStore = defineStore('paradaUpdate', {
	state: (): State => ({
		updated: undefined,
		retrieved: undefined,
		isLoading: false,
		error: undefined,
		hubUrl: undefined,
		violations: undefined,
	}),

	actions: {
		setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Parada>) {
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
		}: UpdateItemData<Parada>) {
			this.setUpdated(updated.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setRetrieved(retrieved?: Parada) {
			this.retrieved = retrieved;
		},

		setUpdated(updated?: Parada) {
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
