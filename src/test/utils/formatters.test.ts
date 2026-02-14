import { describe, test, expect } from 'vitest'
import { formatPhoneNumber, formatCurrency, truncateText } from '../../utils/formatters'

describe('formatPhoneNumber', () => {
  test('formats 10 digit number with dash', () => {
    expect(formatPhoneNumber('9876543210')).toBe('98765-43210')
  })

  test('returns original if not 10 digits', () => {
    expect(formatPhoneNumber('12345')).toBe('12345')
  })

  test('returns empty string for empty input', () => {
    expect(formatPhoneNumber('')).toBe('')
  })

  test('returns original for numbers longer than 10 digits', () => {
    expect(formatPhoneNumber('+91-9876543210')).toBe('+91-9876543210')
  })
})

describe('formatCurrency', () => {
  test('should not crash on null input', () => {
    expect(() => formatCurrency(null as any)).not.toThrow()
    expect(formatCurrency(null as any)).toBe('₹0.00')
  })

  test('should not crash on undefined input', () => {
    expect(() => formatCurrency(undefined as any)).not.toThrow()
    expect(formatCurrency(undefined as any)).toBe('₹0.00')
  })

  test('should not crash on NaN input', () => {
    expect(() => formatCurrency(NaN)).not.toThrow()
    expect(formatCurrency(NaN)).toBe('₹0.00')
  })

  test('formats a normal number', () => {
    const result = formatCurrency(1500)
    expect(result).toContain('1,500')
  })

  test('formats zero', () => {
    const result = formatCurrency(0)
    expect(result).toContain('0')
  })
})

describe('truncateText', () => {
  test('should not crash on null input', () => {
    expect(() => truncateText(null as any, 10)).not.toThrow()
    expect(truncateText(null as any, 10)).toBe('')
  })

  test('should not crash on undefined input', () => {
    expect(() => truncateText(undefined as any, 5)).not.toThrow()
    expect(truncateText(undefined as any, 5)).toBe('')
  })

  test('should handle numeric input without crashing', () => {
    expect(() => truncateText(12345 as any, 3)).not.toThrow()
    expect(truncateText(12345 as any, 3)).toBe('123...')
  })

  test('should return empty for negative maxLength', () => {
    expect(truncateText('hello', -1)).toBe('')
  })

  test('truncates long text', () => {
    expect(truncateText('hello world', 5)).toBe('hello...')
  })

  test('does not truncate short text', () => {
    expect(truncateText('hi', 10)).toBe('hi')
  })
})
