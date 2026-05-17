import { describe, expect, it } from 'vitest';
import { filterProducts } from './filterProducts';

const products = [
  { id: '1', brand: 'Acer', model: 'Liquid Z6', price: '120', imgUrl: '' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S9', price: '600', imgUrl: '' },
];

describe('filterProducts', () => {
  it('returns all products when query is empty', () => {
    expect(filterProducts(products, '')).toHaveLength(2);
  });

  it('filters by brand', () => {
    expect(filterProducts(products, 'acer')).toHaveLength(1);
  });

  it('filters by model', () => {
    expect(filterProducts(products, 'galaxy')).toHaveLength(1);
  });

  it('returns empty when no match', () => {
    expect(filterProducts(products, 'iphone')).toHaveLength(0);
  });
});
