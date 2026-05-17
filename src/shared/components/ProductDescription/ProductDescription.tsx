import { formatPrice } from '@/features/products/utils/formatPrice';
import type { ProductDetail } from '@/shared/types/product';
import styles from './ProductDescription.module.css';

type ProductDescriptionProps = Readonly<{
  product: ProductDetail;
}>;

function formatList(values?: string[]): string {
  if (!values?.length) return '—';
  return values.join(', ');
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  const rows: { label: string; value: string }[] = [
    { label: 'Marca', value: product.brand },
    { label: 'Modelo', value: product.model },
    { label: 'Precio', value: formatPrice(product.price) },
    { label: 'CPU', value: product.cpu ?? '—' },
    { label: 'RAM', value: product.ram ?? '—' },
    { label: 'Sistema operativo', value: product.os ?? '—' },
    { label: 'Resolución de pantalla', value: product.displaySize ?? product.displayResolution ?? '—' },
    { label: 'Batería', value: product.battery ?? '—' },
    { label: 'Cámaras', value: formatList([...(product.primaryCamera ?? []), ...(product.secondaryCmera ?? [])]) },
    { label: 'Dimensiones', value: product.dimentions ?? '—' },
    { label: 'Peso', value: product.weight ? `${product.weight} g` : '—' },
  ];

  return (
    <section className={styles.section} aria-labelledby="product-description-title">
      <h2 id="product-description-title" className={styles.title}>
        Descripción
      </h2>
      <dl className={styles.list}>
        {rows.map(({ label, value }) => (
          <div key={label} className={styles.row}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
