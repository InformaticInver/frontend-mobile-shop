import { Link, useParams } from 'react-router-dom';
import { useProduct } from '@/features/products/hooks/useProduct';
import { ProductActions } from '@/shared/components/ProductActions/ProductActions';
import { ProductDescription } from '@/shared/components/ProductDescription/ProductDescription';
import { ProductImage } from '@/shared/components/ProductImage/ProductImage';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error } = useProduct(id);

  return (
    <section className={styles.page} aria-labelledby="detail-view-title">
      <div className={styles.toolbar}>
        <h1 id="detail-view-title" className={styles.title}>
          Detalle del producto
        </h1>
        <Link to="/" className={styles.backLink}>
          ← Volver al listado
        </Link>
      </div>

      {isLoading && <p className={styles.message}>Cargando producto...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {product && !isLoading && !error && (
        <div className={styles.content}>
          <ProductImage
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
          />
          <div className={styles.details}>
            <ProductDescription product={product} />
            <ProductActions product={product} />
          </div>
        </div>
      )}
    </section>
  );
}
