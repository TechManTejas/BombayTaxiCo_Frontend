/**
 * Error handling utilities for robust application behavior
 */

/**
 * Safely handles potential null/undefined values
 * @param value - Value to check
 * @param fallback - Fallback value if null/undefined
 * @returns Value or fallback
 */
export const safeValue = <T>(value: T | null | undefined, fallback: T): T => {
  return value !== null && value !== undefined ? value : fallback;
};

/**
 * Wraps function calls with try-catch
 * @param fn - Function to wrap
 * @param fallback - Fallback value if error occurs
 * @returns Function result or fallback
 */
export const safeCall = <T>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array)
 * @param value - Value to check
 * @returns True if empty
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
};
