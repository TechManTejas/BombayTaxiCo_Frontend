/**
 * Price calculation and formatting utilities
 */

/**
 * Formats a price value with rupee symbol
 * Handles null, undefined, and zero values correctly
 */
export const formatPrice = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return '₹0';
  return `₹${amount}`;
};

/**
 * Calculates the due amount after subtracting payments
 * Payment amounts are stored in paise (1/100 of rupee)
 */
export const calculateDueAmount = (
  baseFare: number | null | undefined,
  payments: Array<{ amount: number }> | null | undefined
): string => {
  if (!baseFare) return '---';

  const paymentsTotal = payments?.reduce(
    (sum, payment) => sum + payment.amount / 100,
    0
  ) ?? 0;

  return `₹${baseFare - paymentsTotal}`;
};

/**
 * Calculates advance payment based on percentage
 */
export const calculateAdvancePayment = (
  price: number,
  percentage: string | number
): string => {
  if (price === null || price === undefined || isNaN(price)) return '0';
  const pct = typeof percentage === 'string' ? parseInt(percentage) || 0 : percentage;
  if (isNaN(pct)) return '0';
  return Math.round(price * (pct / 100)).toLocaleString();
};
