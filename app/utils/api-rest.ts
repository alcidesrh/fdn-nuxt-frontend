export const API_DEFAULT_OPTIONS: Record<
	string,
	string | Record<string, string>
> = {
	baseURL: ENTRYPOINT,
	method: 'GET',
	mode: 'cors',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
};
