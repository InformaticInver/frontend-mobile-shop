import { useEffect, useState } from 'react';
import { container } from '@/app/di/container';
import type { ProductDetail } from '@/shared/types/product';

interface UseProductState {
  product: ProductDetail | null;
  isLoading: boolean;
  error: string | null;
}

export function useProduct(productId: string | undefined): UseProductState {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError('Producto no encontrado.');
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    container.productRepository
      .getProductById(productId)
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch(() => {
        if (!cancelled) setError('No se pudo cargar el producto.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  return { product, isLoading, error };
}
