/**
 * Image optimization utilities for better performance
 */

/**
 * Generates optimized image URLs with proper sizing
 * @param baseUrl - Base image URL
 * @param width - Desired width
 * @param height - Desired height
 * @param quality - Image quality (0-100)
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
  baseUrl: string,
  width?: number,
  height?: number,
  quality: number = 80
): string => {
  if (!baseUrl) return '';
  
  const url = new URL(baseUrl, window.location.origin);
  if (width) url.searchParams.set('w', width.toString());
  if (height) url.searchParams.set('h', height.toString());
  url.searchParams.set('q', quality.toString());
  url.searchParams.set('fm', 'webp');
  
  return url.toString();
};

/**
 * Preloads images for better performance
 * @param urls - Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
    })
  );
};

/**
 * Checks if WebP format is supported
 * @returns Promise that resolves to boolean
 */
export const checkWebPSupport = (): Promise<boolean> => {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height > 0 && webP.width > 0);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Lazy loads images when they come into viewport
 * @param imageRef - Image element reference
 * @param src - Image source URL
 * @param threshold - Intersection threshold
 */
export const lazyLoadImage = (
  imageRef: HTMLImageElement,
  src: string,
  threshold: number = 0.1
): void => {
  if (!('IntersectionObserver' in window)) {
    imageRef.src = src;
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          imageRef.src = src;
          observer.unobserve(imageRef);
        }
      });
    },
    { threshold }
  );

  observer.observe(imageRef);
};
