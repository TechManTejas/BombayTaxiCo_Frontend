/**
 * Array helper utilities
 */

/**
 * Safely gets array length
 * @param arr - Array to check
 * @returns Length or 0 if not array
 */
export const safeLength = (arr: any): number => {
  if (!Array.isArray(arr)) return 0;
  return arr.length;
};

/**
 * Checks if array is empty or invalid
 * @param arr - Array to check
 * @returns True if empty or invalid
 */
export const isEmpty = (arr: any): boolean => {
  return safeLength(arr) === 0;
};
