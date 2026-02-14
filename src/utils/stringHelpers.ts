/**
 * String helper utilities
 */

/**
 * Safely converts any value to string
 * @param value - Value to convert
 * @returns String representation
 */
export const safeString = (value: any): string => {
  if (value === null || value === undefined) return '';
  return String(value);
};

/**
 * Truncates string to specified length
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @returns Truncated string
 */
export const truncate = (str: string, maxLength: number): string => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};
