import styles from './ProductImage.module.css';

type ProductImageProps = Readonly<{
  src: string;
  alt: string;
}>;

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className={styles.wrapper}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
}
