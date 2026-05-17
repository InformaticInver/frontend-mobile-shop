import { useState } from 'react';
import { PurchaseSuccessModal } from '@/features/cart/components/PurchaseSuccessModal/PurchaseSuccessModal';
import { useCart } from '@/features/cart/context/useCart';
import { formatPrice } from '@/features/products/utils/formatPrice';
import { useModalDialog } from '@/shared/hooks/useModalDialog';
import styles from './CartModal.module.css';

export function CartModal() {
  const { items, isModalOpen, closeCartModal, clearCart } = useCart();
  const [isPurchaseSuccessOpen, setIsPurchaseSuccessOpen] = useState(false);
  const dialogRef = useModalDialog(isModalOpen);

  const handlePurchase = () => {
    if (items.length === 0) return;
    clearCart();
    closeCartModal();
    setIsPurchaseSuccessOpen(true);
  };

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    closeCartModal();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="cart-modal-title"
        onCancel={handleCancel}
      >
        <button
          type="button"
          className={styles.backdrop}
          onClick={closeCartModal}
          aria-label="Cerrar cesta"
        />
        <div className={styles.panel}>
          <div className={styles.content}>
            <header className={styles.header}>
              <h2 id="cart-modal-title" className={styles.title}>
                Tu cesta ({items.length})
              </h2>
            </header>

            {items.length === 0 ? (
              <p className={styles.empty}>No hay productos en la cesta.</p>
            ) : (
              <ul className={styles.list}>
                {items.map((item, index) => (
                  <li
                    key={`${item.id}-${item.colorCode}-${item.storageCode}-${index}`}
                    className={styles.item}
                  >
                    <img
                      className={styles.image}
                      src={item.imgUrl}
                      alt={`${item.brand} ${item.model}`}
                      loading="lazy"
                    />
                    <div className={styles.info}>
                      <p className={styles.name}>
                        {item.brand} {item.model}
                      </p>
                      <p className={styles.variant}>
                        {item.storageName} · {item.colorName}
                      </p>
                      <p className={styles.price}>{formatPrice(item.price)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <footer className={styles.actions}>
              <button
                type="button"
                className={`${styles.button} ${styles.delete}`}
                onClick={clearCart}
                disabled={items.length === 0}
              >
                Borrar
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.buy}`}
                onClick={handlePurchase}
                disabled={items.length === 0}
              >
                Comprar
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.cancel}`}
                onClick={closeCartModal}
              >
                Cancelar
              </button>
            </footer>
          </div>
        </div>
      </dialog>

      <PurchaseSuccessModal
        isOpen={isPurchaseSuccessOpen}
        onClose={() => setIsPurchaseSuccessOpen(false)}
      />
    </>
  );
}
