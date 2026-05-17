import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/features/cart/context/useCart';
import styles from './Header.module.css';

export function Header() {
  const { count, openCartModal } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          ITX Mobile Shop
        </Link>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/" className={isHome ? styles.active : undefined}>
            Productos
          </Link>
          {!isHome && (
            <>
              <span className={styles.separator}>/</span>
              <span className={styles.active}>Detalle</span>
            </>
          )}
        </nav>
      </div>
      <button
        type="button"
        className={styles.cart}
        onClick={openCartModal}
        aria-label={`${count} artículos en la cesta. Abrir cesta`}
      >
        <span className={styles.cartIcon} aria-hidden>
          🛒
        </span>
        <span className={styles.cartCount}>{count}</span>
      </button>
    </header>
  );
}
