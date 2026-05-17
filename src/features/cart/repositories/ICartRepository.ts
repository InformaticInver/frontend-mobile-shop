import type { AddToCartPayload, CartCountResponse } from '@/shared/types/cart';

export interface ICartRepository {
  addItem(payload: AddToCartPayload): Promise<CartCountResponse>;
}
