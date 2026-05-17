import { useModalDialog } from '@/shared/hooks/useModalDialog';
import styles from './PurchaseSuccessModal.module.css';

type PurchaseSuccessModalProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export function PurchaseSuccessModal({ isOpen, onClose }: PurchaseSuccessModalProps) {
  const dialogRef = useModalDialog(isOpen);

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="purchase-success-title"
      onCancel={handleCancel}
    >
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Cerrar mensaje de compra"
      />
      <div className={styles.panel}>
        <div className={styles.content}>
          <span className={styles.icon} aria-hidden>
            🎉
          </span>
          <h2 id="purchase-success-title" className={styles.title}>
            ¡Felicidades!
          </h2>
          <p className={styles.message}>
            Tu compra se ha realizado correctamente. Gracias por confiar en ITX Mobile Shop.
          </p>
          <button type="button" className={styles.button} onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </dialog>
  );
}
