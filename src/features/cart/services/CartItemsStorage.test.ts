import { beforeEach, describe, expect, it } from 'vitest';
import type { CartItem } from '@/shared/types/cart';
import { CartItemsStorage } from './CartItemsStorage';

const sampleItem: CartItem = {
  id: '1',
  brand: 'Apple',
  model: 'iPhone',
  price: '999',
  imgUrl: 'https://example.com/img.png',
  colorCode: 1,
  colorName: 'Black',
  storageCode: 2,
  storageName: '128GB',
};

describe('CartItemsStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array when nothing stored', () => {
    expect(new CartItemsStorage().get()).toEqual([]);
  });

  it('persists cart items', () => {
    const storage = new CartItemsStorage();
    storage.set([sampleItem]);
    expect(storage.get()).toEqual([sampleItem]);
  });
});
