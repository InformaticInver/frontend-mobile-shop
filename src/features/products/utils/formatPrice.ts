export function formatPrice(price: string): string {
  if (!price.trim()) return '—';
  return `${price} €`;
}
