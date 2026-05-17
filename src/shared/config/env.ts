const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;

export const env = {
  apiBaseUrl: (baseUrl ?? 'https://itx-frontend-test.onrender.com').replace(/\/$/, ''),
  cacheTtlMs: 60 * 60 * 1000,
} as const;
