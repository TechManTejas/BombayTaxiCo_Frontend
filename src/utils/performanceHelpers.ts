/**
 * Performance optimization utilities
 */

/**
 * Debounces function calls to improve performance
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttles function calls to improve performance
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Memoizes expensive calculations
 * @param func - Function to memoize
 * @returns Memoized function
 */
export const memoize = <T extends (...args: any[]) => any>(func: T): T => {
  const cache = new Map();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

/**
 * Measures function execution time
 * @param func - Function to measure
 * @returns Execution time in milliseconds
 */
export const measurePerformance = <T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
): { result: ReturnType<T>; time: number } => {
  const start = performance.now();
  const result = func(...args);
  const end = performance.now();
  return { result, time: end - start };
};
