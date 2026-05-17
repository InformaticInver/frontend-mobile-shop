import type { ProductSummary } from '@/shared/types/product';

export function filterProducts(
  products: ProductSummary[],
  query: string,
): ProductSummary[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return products;

  return products.filter(
    (product) =>
      product.brand.toLowerCase().includes(normalized) ||
      product.model.toLowerCase().includes(normalized),
  );
}
