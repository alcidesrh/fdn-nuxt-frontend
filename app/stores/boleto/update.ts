import type { FetchItemData, UpdateItemData } from '~/types/api';
import type { Boleto } from '~/types/boleto';
import type { SubmissionErrors } from '~/types/error';
import { defineStore } from 'pinia';

interface State {
	updated?: Boleto;
	retrieved?: Boleto;
	isLoading: boolean;
	error?: string;
	hubUrl?: URL;
	violations?: SubmissionErrors;
}

export const useBoletoUpdateStore = defineStore('boletoUpdate', {
	state: (): State => ({
		updated: undefined,
		retrieved: undefined,
		isLoading: false,
		error: undefined,
		hubUrl: undefined,
		violations: undefined,
	}),

	actions: {
		setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Boleto>) {
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
		}: UpdateItemData<Boleto>) {
			this.setUpdated(updated.value);
			this.setLoading(isLoading.value);
			this.setViolations(violations.value);

			if (error.value instanceof Error) {
				this.setError(error.value?.message);
			}
		},

		setRetrieved(retrieved?: Boleto) {
			this.retrieved = retrieved;
		},

		setUpdated(updated?: Boleto) {
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
