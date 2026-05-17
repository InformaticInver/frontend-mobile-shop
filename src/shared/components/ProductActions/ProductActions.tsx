import { useEffect, useState } from 'react';
import { useCart } from '@/features/cart/context/useCart';
import type { ProductDetail, ProductOption } from '@/shared/types/product';
import styles from './ProductActions.module.css';

type ProductActionsProps = Readonly<{
  product: ProductDetail;
}>;

function getDefaultOption(options: ProductOption[]): ProductOption | null {
  return options[0] ?? null;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addToCart, isAdding } = useCart();
  const colors = product.options.colors;
  const storages = product.options.storages;

  const [colorCode, setColorCode] = useState<number | null>(null);
  const [storageCode, setStorageCode] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setColorCode(getDefaultOption(colors)?.code ?? null);
    setStorageCode(getDefaultOption(storages)?.code ?? null);
  }, [product.id, colors, storages]);

  const handleAdd = async () => {
    if (colorCode === null || storageCode === null) {
      setError('Selecciona color y almacenamiento.');
      return;
    }

    const colorName =
      colors.find((option) => option.code === colorCode)?.name ?? '';
    const storageName =
      storages.find((option) => option.code === storageCode)?.name ?? '';

    setError(null);
    try {
      await addToCart({
        id: product.id,
        colorCode,
        storageCode,
        brand: product.brand,
        model: product.model,
        price: product.price,
        imgUrl: product.imgUrl,
        colorName,
        storageName,
      });
    } catch {
      setError('No se pudo añadir el producto a la cesta.');
    }
  };

  return (
    <section className={styles.section} aria-labelledby="product-actions-title">
      <h2 id="product-actions-title" className={styles.title}>
        Acciones
      </h2>

      <label className={styles.field}>
        <span className={styles.label}>Almacenamiento</span>
        <select
          className={styles.select}
          value={storageCode ?? ''}
          onChange={(event) => setStorageCode(Number(event.target.value))}
        >
          {storages.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Color</span>
        <select
          className={styles.select}
          value={colorCode ?? ''}
          onChange={(event) => setColorCode(Number(event.target.value))}
        >
          {colors.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name}
            </option>
          ))}
        </select>
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <button
        type="button"
        className={styles.button}
        onClick={handleAdd}
        disabled={isAdding}
      >
        {isAdding ? 'Añadiendo...' : 'Añadir a la cesta'}
      </button>
    </section>
  );
}
