import { env } from '@/shared/config/env';
import type { ICacheStorage } from './ICacheStorage';

export class CachedFetcher {
  constructor(private readonly storage: ICacheStorage) {}

  async fetch<T>(key: string, loader: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const cached = this.storage.get<T>(key);

    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    const data = await loader();
    this.storage.set(key, { data, expiresAt: now + env.cacheTtlMs });
    return data;
  }
}
