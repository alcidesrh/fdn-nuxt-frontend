export const ENTRYPOINT = "https://localhost";

export const API_DEFAULT_OPTIONS: Record<any, unknown> = {
  baseURL: ENTRYPOINT,
  method: 'POST',
  // mode: "no-cors",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
}
