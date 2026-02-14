/**
 * Safe math operations to prevent runtime errors
 */

/**
 * Safely divides two numbers, preventing division by zero
 * @param a - Numerator
 * @param b - Denominator  
 * @param fallback - Value to return if division by zero
 * @returns Safe division result
 */
export const safeDivide = (a: number, b: number, fallback: number = 0): number => {
  if (a === null || a === undefined || isNaN(a)) return fallback;
  if (b === null || b === undefined || isNaN(b)) return fallback;
  return b === 0 ? fallback : a / b;
};

/**
 * Validates if a value is a finite number
 * @param value - Value to check
 * @returns True if valid finite number
 */
export const isValidNumber = (value: any): boolean => {
  return typeof value === 'number' && isFinite(value) && !isNaN(value);
};
