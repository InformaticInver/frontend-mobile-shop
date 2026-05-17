import { describe, expect, it, vi, beforeEach } from 'vitest';
import { CachedFetcher } from './CachedFetcher';
import type { ICacheStorage, CacheEntry } from './ICacheStorage';

class InMemoryCache implements ICacheStorage {
  private readonly store = new Map<string, CacheEntry<unknown>>();

  get<T>(key: string): CacheEntry<T> | null {
    return (this.store.get(key) as CacheEntry<T> | undefined) ?? null;
  }

  set<T>(key: string, entry: CacheEntry<T>): void {
    this.store.set(key, entry);
  }

  remove(key: string): void {
    this.store.delete(key);
  }
}

describe('CachedFetcher', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('returns cached data when not expired', async () => {
    const cache = new InMemoryCache();
    const fetcher = new CachedFetcher(cache);
    const loader = vi.fn().mockResolvedValue(['product']);

    await fetcher.fetch('products:list', loader);
    const result = await fetcher.fetch('products:list', loader);

    expect(result).toEqual(['product']);
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('revalidates after TTL expires', async () => {
    const cache = new InMemoryCache();
    const fetcher = new CachedFetcher(cache);
    const loader = vi
      .fn()
      .mockResolvedValueOnce(['first'])
      .mockResolvedValueOnce(['second']);

    await fetcher.fetch('products:list', loader);
    vi.advanceTimersByTime(60 * 60 * 1000 + 1);
    const result = await fetcher.fetch('products:list', loader);

    expect(result).toEqual(['second']);
    expect(loader).toHaveBeenCalledTimes(2);
  });
});
