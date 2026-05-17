import { useProducts } from '@/features/products/hooks/useProducts';
import { ProductItem } from '@/shared/components/ProductItem/ProductItem';
import { Search } from '@/shared/components/Search/Search';
import styles from './ProductListPage.module.css';

export function ProductListPage() {
  const { filteredProducts, searchQuery, isLoading, error, setSearchQuery } = useProducts();

  return (
    <section className={styles.page} aria-labelledby="list-view-title">
      <div className={styles.toolbar}>
        <h1 id="list-view-title" className={styles.title}>
          Listado de productos
        </h1>
        <Search value={searchQuery} onChange={setSearchQuery} />
      </div>

      {isLoading && <p className={styles.message}>Cargando productos...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && (
        <>
          {filteredProducts.length === 0 ? (
            <p className={styles.message}>No hay productos que coincidan con la búsqueda.</p>
          ) : (
            <ul className={styles.grid}>
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <ProductItem product={product} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
