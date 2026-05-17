import { createContext } from 'react';
import type { AddToCartInput, CartItem } from '@/shared/types/cart';

export interface CartContextValue {
  items: CartItem[];
  count: number;
  isAdding: boolean;
  isModalOpen: boolean;
  addToCart: (input: AddToCartInput) => Promise<void>;
  clearCart: () => void;
  openCartModal: () => void;
  closeCartModal: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
