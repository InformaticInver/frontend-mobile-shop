import { env } from '@/shared/config/env';

export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export async function httpGet<T>(path: string): Promise<T> {
  const response = await fetch(`${env.apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new HttpError(`GET ${path} failed`, response.status);
  }

  return response.json() as Promise<T>;
}

export async function httpPost<TBody, TResponse>(
  path: string,
  body: TBody,
): Promise<TResponse> {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new HttpError(`POST ${path} failed`, response.status);
  }

  return response.json() as Promise<TResponse>;
}
