import { CartApiRepository } from '@/features/cart/repositories/CartApiRepository';
import { CartItemsStorage } from '@/features/cart/services/CartItemsStorage';
import { CachedProductRepository } from '@/features/products/repositories/CachedProductRepository';
import { ProductApiRepository } from '@/features/products/repositories/ProductApiRepository';
import { CachedFetcher } from '@/shared/cache/CachedFetcher';
import { LocalStorageCache } from '@/shared/cache/LocalStorageCache';

const cacheStorage = new LocalStorageCache();
const cachedFetcher = new CachedFetcher(cacheStorage);

const productApi = new ProductApiRepository();

export const container = {
  productRepository: new CachedProductRepository(productApi, cachedFetcher),
  cartRepository: new CartApiRepository(),
  cartItemsStorage: new CartItemsStorage(),
} as const;
