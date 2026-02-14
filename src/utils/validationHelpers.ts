/**
 * Enhanced validation helpers for robust form validation
 */

/**
 * Validates Indian phone numbers with various formats
 * @param phone - Phone number string
 * @returns True if valid Indian phone number
 */
export const isValidIndianPhone = (phone: string): boolean => {
  if (phone === null || phone === undefined) return false;
  const str = String(phone);
  if (!str) return false;
  const cleanPhone = str.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleanPhone);
};

/**
 * Validates email addresses with comprehensive regex
 * @param email - Email address string
 * @returns True if valid email
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Safely extracts digits from a string
 * @param input - Input string
 * @returns Digits only or empty string
 */
export const extractDigits = (input: string): string => {
  if (input === null || input === undefined) return '';
  return String(input).replace(/\D/g, '');
};
