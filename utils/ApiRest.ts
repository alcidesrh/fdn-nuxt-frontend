export const ENTRYPOINT = 'http://localhost';

export const API_DEFAULT_OPTIONS: Record<any, unknown> = {
    baseURL: ENTRYPOINT,
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
};
