// Built once — Intl formatters are relatively expensive to create.
const wonFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

export function formatPrice(amount) {
  return wonFormatter.format(amount);
}
