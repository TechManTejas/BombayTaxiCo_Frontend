import { describe, test, expect } from 'vitest'
import {
  buildImageUrl,
  getQueryParams,
  buildUrlWithParams,
  isValidUrl,
} from '../../utils/urlHelpers'

describe('buildImageUrl', () => {
  test('returns placeholder for null path', () => {
    expect(buildImageUrl(null)).toBe('/placeholder.png')
  })

  test('returns placeholder for undefined path', () => {
    expect(buildImageUrl(undefined)).toBe('/placeholder.png')
  })

  test('returns placeholder for string undefined', () => {
    expect(buildImageUrl('undefined')).toBe('/placeholder.png')
  })

  test('returns placeholder for string null', () => {
    expect(buildImageUrl('null')).toBe('/placeholder.png')
  })

  test('builds url with custom base', () => {
    const result = buildImageUrl('images/car.png', 'https://cdn.example.com')
    expect(result).toBe('https://cdn.example.com/images/car.png')
  })

  test('handles empty string path', () => {
    expect(buildImageUrl('')).toBe('/placeholder.png')
  })
})

describe('getQueryParams', () => {
  test('extracts params from url', () => {
    const params = getQueryParams('http://localhost/search?city=mumbai&type=sedan')
    expect(params.city).toBe('mumbai')
    expect(params.type).toBe('sedan')
  })

  test('returns empty object for null', () => {
    expect(getQueryParams(null)).toEqual({})
  })

  test('returns empty object for undefined', () => {
    expect(getQueryParams(undefined)).toEqual({})
  })

  test('returns empty object for url without params', () => {
    expect(getQueryParams('/search')).toEqual({})
  })
})

describe('buildUrlWithParams', () => {
  test('builds url with params', () => {
    const result = buildUrlWithParams('/search', { city: 'mumbai', type: 'sedan' })
    expect(result).toContain('/search?')
    expect(result).toContain('city=mumbai')
    expect(result).toContain('type=sedan')
  })

  test('skips null params', () => {
    const result = buildUrlWithParams('/search', { city: 'mumbai', type: null })
    expect(result).toContain('city=mumbai')
    expect(result).not.toContain('type')
  })

  test('skips undefined params', () => {
    const result = buildUrlWithParams('/search', { city: undefined })
    expect(result).toBe('/search')
  })

  test('returns empty string for empty basePath', () => {
    expect(buildUrlWithParams('', { city: 'mumbai' })).toBe('')
  })

  test('handles numeric params', () => {
    const result = buildUrlWithParams('/api', { page: 1, limit: 10 })
    expect(result).toContain('page=1')
    expect(result).toContain('limit=10')
  })
})

describe('isValidUrl', () => {
  test('returns true for valid http url', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
  })

  test('returns false for null', () => {
    expect(isValidUrl(null)).toBe(false)
  })

  test('returns false for undefined', () => {
    expect(isValidUrl(undefined)).toBe(false)
  })

  test('returns false for random string', () => {
    expect(isValidUrl('not a url')).toBe(false)
  })

  test('returns false for empty string', () => {
    expect(isValidUrl('')).toBe(false)
  })
})
