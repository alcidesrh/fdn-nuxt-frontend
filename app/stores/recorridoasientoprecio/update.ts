import type { FetchItemData, UpdateItemData } from '~/types/api';
import type { SubmissionErrors } from '~/types/error';
import type { RecorridoAsientoPrecio } from '~/types/recorridoasientoprecio';
import { defineStore } from 'pinia';

interface State {
	updated?: RecorridoAsientoPrecio;
	retrieved?: RecorridoAsientoPrecio;
	isLoading: boolean;
	error?: string;
	hubUrl?: URL;
	violations?: SubmissionErrors;
}

export const useRecorridoAsientoPrecioUpdateStore = defineStore(
	'recorridoasientoprecioUpdate',
	{
		state: (): State => ({
			updated: undefined,
			retrieved: undefined,
			isLoading: false,
			error: undefined,
			hubUrl: undefined,
			violations: undefined,
		}),

		actions: {
			setData({
				retrieved,
				isLoading,
				error,
				hubUrl,
			}: FetchItemData<RecorridoAsientoPrecio>) {
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
			}: UpdateItemData<RecorridoAsientoPrecio>) {
				this.setUpdated(updated.value);
				this.setLoading(isLoading.value);
				this.setViolations(violations.value);

				if (error.value instanceof Error) {
					this.setError(error.value?.message);
				}
			},

			setRetrieved(retrieved?: RecorridoAsientoPrecio) {
				this.retrieved = retrieved;
			},

			setUpdated(updated?: RecorridoAsientoPrecio) {
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
	},
);
