import { useEffect, useMemo, useState } from 'react';
import { container } from '@/app/di/container';
import type { ProductSummary } from '@/shared/types/product';
import { filterProducts } from '../utils/filterProducts';

interface UseProductsState {
  products: ProductSummary[];
  filteredProducts: ProductSummary[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  setSearchQuery: (query: string) => void;
}

export function useProducts(): UseProductsState {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    container.productRepository
      .getProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled) setError('No se pudo cargar el catálogo.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(
    () => filterProducts(products, searchQuery),
    [products, searchQuery],
  );

  return {
    products,
    filteredProducts,
    searchQuery,
    isLoading,
    error,
    setSearchQuery,
  };
}
