import { CachedFetcher } from '@/shared/cache/CachedFetcher';
import type { ProductDetail, ProductSummary } from '@/shared/types/product';
import type { IProductRepository } from './IProductRepository';

const LIST_KEY = 'products:list';

export class CachedProductRepository implements IProductRepository {
  constructor(
    private readonly delegate: IProductRepository,
    private readonly cache: CachedFetcher,
  ) {}

  getProducts(): Promise<ProductSummary[]> {
    return this.cache.fetch(LIST_KEY, () => this.delegate.getProducts());
  }

  getProductById(id: string): Promise<ProductDetail> {
    return this.cache.fetch(`product:${id}`, () => this.delegate.getProductById(id));
  }
}
