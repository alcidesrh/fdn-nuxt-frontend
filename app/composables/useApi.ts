import type { FetchError } from 'ofetch';
import type { UseFetchOptions } from 'nuxt/app';

interface CustomError {
	message: string;
	statusCode: number;
}
export function useApiRest<T>(
	url: string | (() => string),
	options?: UseFetchOptions<T> = {},
) {
	return useNuxtApp().$api(url, options);
}
