import { httpPost } from '@/shared/api/httpClient';
import type { AddToCartPayload, CartCountResponse } from '@/shared/types/cart';
import type { ICartRepository } from './ICartRepository';

export class CartApiRepository implements ICartRepository {
  addItem(payload: AddToCartPayload): Promise<CartCountResponse> {
    return httpPost<AddToCartPayload, CartCountResponse>('/api/cart', payload);
  }
}
