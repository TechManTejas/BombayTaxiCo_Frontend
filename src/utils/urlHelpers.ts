/**
 * URL building and parsing helpers for the app
 */

/**
 * Builds a full image URL from a relative path
 * Falls back to placeholder if path is empty or invalid
 */
export const buildImageUrl = (
  relativePath: string | null | undefined,
  baseUrl?: string
): string => {
  if (!relativePath || relativePath === 'undefined' || relativePath === 'null') {
    return '/placeholder.png';
  }
  const base = baseUrl || import.meta.env?.VITE_BASE_URL || '';
  return `${base}/${relativePath}`.replace(/\/+/g, '/').replace(':/', '://');
};

/**
 * Extracts query parameters from a URL string
 * Returns empty object if URL is invalid
 */
export const getQueryParams = (url: string | null | undefined): Record<string, string> => {
  if (!url) return {};
  try {
    const urlObj = new URL(url, window.location.origin);
    const params: Record<string, string> = {};
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  } catch {
    return {};
  }
};

/**
 * Builds a URL with query parameters
 */
export const buildUrlWithParams = (
  basePath: string,
  params: Record<string, string | number | null | undefined>
): string => {
  if (!basePath) return '';
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

/**
 * Checks if a string is a valid URL
 */
export const isValidUrl = (str: string | null | undefined): boolean => {
  if (!str) return false;
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};
