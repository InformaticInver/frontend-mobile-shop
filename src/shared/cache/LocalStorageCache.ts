import type { CacheEntry, ICacheStorage } from './ICacheStorage';

export class LocalStorageCache implements ICacheStorage {
  private readonly prefix = 'mobile-shop:cache:';

  get<T>(key: string): CacheEntry<T> | null {
    const raw = localStorage.getItem(this.prefix + key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as CacheEntry<T>;
    } catch {
      this.remove(key);
      return null;
    }
  }

  set<T>(key: string, entry: CacheEntry<T>): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(entry));
  }

  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
}
