/**
 * Array helper utilities
 */

/**
 * Safely gets array length
 * @param arr - Array to check
 * @returns Length or 0 if not array
 */
export const safeLength = (arr: any): number => {
  if (arr === null || arr === undefined) return 0;
  if (typeof arr === 'string') return arr.length;
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

/**
 * Returns unique items from array based on a key function
 * @param arr - Array to deduplicate
 * @param keyFn - Function to extract key from each item
 * @returns Array with unique items
 */
export const uniqueBy = <T>(arr: T[], keyFn: (item: T) => string | number): T[] => {
  if (!Array.isArray(arr)) return [];
  const seen = new Set<string | number>();
  return arr.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
