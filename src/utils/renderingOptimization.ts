/**
 * Rendering optimization utilities for React components
 */

import { useCallback, useMemo, useRef, useEffect } from 'react';

/**
 * Custom hook for virtual scrolling optimization
 * @param items - Array of items to render
 * @param itemHeight - Height of each item
 * @param containerHeight - Height of container
 * @returns Visible items and scroll handlers
 */
export const useVirtualScroll = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useRef(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop.current / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return {
      items: items.slice(startIndex, endIndex),
      startIndex,
      endIndex,
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight
    };
  }, [items, itemHeight, containerHeight, scrollTop.current]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    scrollTop.current = e.currentTarget.scrollTop;
  }, []);

  return { visibleItems, handleScroll };
};

/**
 * Custom hook for optimizing expensive calculations
 * @param factory - Function that returns the value to memoize
 * @param deps - Dependencies array
 * @returns Memoized value
 */
export const useDeepMemo = <T>(factory: () => T, deps: React.DependencyList): T => {
  const ref = useRef<{ deps: React.DependencyList; value: T }>();
  
  if (!ref.current || !deps.every((dep, i) => dep === ref.current!.deps[i])) {
    ref.current = { deps, value: factory() };
  }
  
  return ref.current.value;
};

/**
 * Custom hook for debounced callbacks
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced callback
 */
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;
};

/**
 * Custom hook for throttled callbacks
 * @param callback - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled callback
 */
export const useThrottledCallback = <T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): T => {
  const inThrottleRef = useRef(false);

  return useCallback((...args: Parameters<T>) => {
    if (!inThrottleRef.current) {
      callback(...args);
      inThrottleRef.current = true;
      setTimeout(() => {
        inThrottleRef.current = false;
      }, limit);
    }
  }, [callback, limit]) as T;
};

/**
 * Custom hook for intersection observer optimization
 * @param callback - Callback function
 * @param options - Intersection observer options
 * @returns Observer ref
 */
export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const ref = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, options);
    
    if (ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return ref;
};
