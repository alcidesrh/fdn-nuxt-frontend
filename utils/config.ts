// export const ENTRYPOINT = "https://localhost/api";
export const HOST = "https://localhost";
export const ENTRYPOINT: string = typeof window === "undefined" ? process.env.NUXT_PUBLIC_ENTRYPOINT : window.origin;
