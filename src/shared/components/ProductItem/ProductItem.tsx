import { Link } from 'react-router-dom';
import { formatPrice } from '@/features/products/utils/formatPrice';
import type { ProductSummary } from '@/shared/types/product';
import styles from './ProductItem.module.css';

type ProductItemProps = Readonly<{
  product: ProductSummary;
}>;

export function ProductItem({ product }: ProductItemProps) {
  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.link}>
        <div className={styles.imageWrap}>
          <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} loading="lazy" />
        </div>
        <div className={styles.body}>
          <p className={styles.brand}>{product.brand}</p>
          <h2 className={styles.model}>{product.model}</h2>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
