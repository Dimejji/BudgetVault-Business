export function formatNaira(amount) {
  if (amount == null || Number.isNaN(Number(amount))) {
    return '₦0'
  }

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount))
}
