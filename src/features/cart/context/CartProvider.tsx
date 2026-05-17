import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { container } from '@/app/di/container';
import { CartModal } from '@/features/cart/components/CartModal/CartModal';
import type { AddToCartInput, CartItem } from '@/shared/types/cart';
import { CartContext } from './cartContext';

function toCartItem(input: AddToCartInput): CartItem {
  return {
    id: input.id,
    brand: input.brand,
    model: input.model,
    price: input.price,
    imgUrl: input.imgUrl,
    colorCode: input.colorCode,
    colorName: input.colorName,
    storageCode: input.storageCode,
    storageName: input.storageName,
  };
}

type CartProviderProps = Readonly<{
  children: ReactNode;
}>;

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState(() => container.cartItemsStorage.get());
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const persistItems = useCallback((nextItems: CartItem[]) => {
    setItems(nextItems);
    container.cartItemsStorage.set(nextItems);
  }, []);

  const addToCart = useCallback(async (input: AddToCartInput) => {
    setIsAdding(true);
    try {
      await container.cartRepository.addItem({
        id: input.id,
        colorCode: input.colorCode,
        storageCode: input.storageCode,
      });
      setItems((previous) => {
        const nextItems = [...previous, toCartItem(input)];
        container.cartItemsStorage.set(nextItems);
        return nextItems;
      });
    } finally {
      setIsAdding(false);
    }
  }, []);

  const clearCart = useCallback(() => {
    persistItems([]);
  }, [persistItems]);

  const openCartModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeCartModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const count = items.length;

  const value = useMemo(
    () => ({
      items,
      count,
      isAdding,
      isModalOpen,
      addToCart,
      clearCart,
      openCartModal,
      closeCartModal,
    }),
    [
      items,
      count,
      isAdding,
      isModalOpen,
      addToCart,
      clearCart,
      openCartModal,
      closeCartModal,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartModal />
    </CartContext.Provider>
  );
}
