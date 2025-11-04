export const API_DEFAULT_OPTIONS: Record<
	string,
	string | Record<string, string>
> = {
	baseURL: ENTRYPOINT,
	method: 'POST',
	mode: 'cors',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
};
