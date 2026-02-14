/**
 * Data formatting utilities for consistent display
 */

/**
 * Formats phone number for display
 * @param phone - Raw phone number
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  if (phone === null || phone === undefined) return '';
  const str = String(phone);
  if (!str) return '';
  const cleanPhone = str.replace(/\D/g, '');
  if (cleanPhone.length === 10) {
    return `${cleanPhone.slice(0, 5)}-${cleanPhone.slice(5)}`;
  }
  return str;
};

/**
 * Formats currency amount
 * @param amount - Amount to format
 * @param currency - Currency code (default: INR)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Truncates text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text === null || text === undefined) return '';
  const str = String(text);
  if (maxLength < 0) return '';
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
};
