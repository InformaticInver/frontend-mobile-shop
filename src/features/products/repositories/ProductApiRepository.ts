import { httpGet } from '@/shared/api/httpClient';
import type { ProductDetail, ProductSummary } from '@/shared/types/product';
import type { IProductRepository } from './IProductRepository';

export class ProductApiRepository implements IProductRepository {
  getProducts(): Promise<ProductSummary[]> {
    return httpGet<ProductSummary[]>('/api/product');
  }

  getProductById(id: string): Promise<ProductDetail> {
    return httpGet<ProductDetail>(`/api/product/${id}`);
  }
}
