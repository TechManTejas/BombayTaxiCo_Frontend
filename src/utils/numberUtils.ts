/**
 * Number utility functions
 * Provides safe number operations to prevent runtime errors
 */

/**
 * Safely divides two numbers, preventing division by zero
 * @param numerator - The numerator
 * @param denominator - The denominator
 * @param fallback - Value to return if denominator is zero (default: 0)
 * @returns Safe division result or fallback value
 */
export const safeDivide = (numerator: number, denominator: number, fallback: number = 0): number => {
  if (numerator === null || numerator === undefined || isNaN(numerator)) return fallback;
  if (denominator === null || denominator === undefined || isNaN(denominator)) return fallback;
  if (denominator === 0) {
    return fallback;
  }
  return numerator / denominator;
};

/**
 * Checks if a value is a valid finite number
 * @param value - Value to check
 * @returns True if value is a valid finite number
 */
export const isValidNumber = (value: any): boolean => {
  return typeof value === 'number' && isFinite(value) && !isNaN(value);
};

/**
 * Clamps a number between min and max values
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export const clamp = (value: number, min: number, max: number): number => {
  if (value === null || value === undefined || isNaN(value)) return min;
  if (min > max) return min;
  return Math.min(Math.max(value, min), max);
};
