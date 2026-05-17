export interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export interface ICacheStorage {
  get<T>(key: string): CacheEntry<T> | null;
  set<T>(key: string, entry: CacheEntry<T>): void;
  remove(key: string): void;
}
