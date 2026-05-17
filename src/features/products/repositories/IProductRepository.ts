import type { ProductDetail, ProductSummary } from '@/shared/types/product';

export interface IProductRepository {
  getProducts(): Promise<ProductSummary[]>;
  getProductById(id: string): Promise<ProductDetail>;
}
