import type { CartItem } from '@/shared/types/cart';

const STORAGE_KEY = 'mobile-shop:cart-items';

export class CartItemsStorage {
  get(): CartItem[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  set(items: CartItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}
