/**
 * Coupon validation and discount calculation helpers
 */

/**
 * Validates a coupon code format
 * Must be alphanumeric, 4-20 characters
 */
export const isValidCouponCode = (code: string | null | undefined): boolean => {
  if (!code) return false;
  const trimmed = code.trim();
  if (trimmed.length < 4 || trimmed.length > 20) return false;
  return /^[A-Za-z0-9]+$/.test(trimmed);
};

/**
 * Calculates the discounted price after applying a coupon
 * @param originalPrice - Original price
 * @param discountPercent - Discount percentage (0-100)
 * @param maxDiscount - Maximum discount amount (optional cap)
 * @returns Discounted price, never below 0
 */
export const calculateDiscountedPrice = (
  originalPrice: number | null | undefined,
  discountPercent: number | null | undefined,
  maxDiscount?: number | null
): number => {
  if (!originalPrice || originalPrice <= 0) return 0;
  if (!discountPercent || discountPercent <= 0) return originalPrice;
  
  const pct = Math.min(discountPercent, 100);
  let discount = originalPrice * (pct / 100);
  
  if (maxDiscount && maxDiscount > 0) {
    discount = Math.min(discount, maxDiscount);
  }
  
  return Math.round(originalPrice - discount);
};

/**
 * Formats a discount for display
 */
export const formatDiscount = (
  discountPercent: number | null | undefined,
  maxDiscount?: number | null
): string => {
  if (!discountPercent || discountPercent <= 0) return '';
  const pct = Math.min(discountPercent, 100);
  if (maxDiscount && maxDiscount > 0) {
    return `${pct}% off (up to ₹${maxDiscount})`;
  }
  return `${pct}% off`;
};

/**
 * Checks if a coupon is expired
 */
export const isCouponExpired = (expiryDate: string | null | undefined): boolean => {
  if (!expiryDate) return true;
  const expiry = new Date(expiryDate);
  if (isNaN(expiry.getTime())) return true;
  return expiry < new Date();
};
