import { describe, test, expect } from 'vitest'
import { safeString, truncate } from '../../utils/stringHelpers'

describe('safeString', () => {
  test('converts number to string', () => {
    expect(safeString(123)).toBe('123')
  })

  test('converts boolean to string', () => {
    expect(safeString(true)).toBe('true')
  })

  test('returns empty string for null', () => {
    expect(safeString(null)).toBe('')
  })

  test('returns empty string for undefined', () => {
    expect(safeString(undefined)).toBe('')
  })

  test('keeps normal string as is', () => {
    expect(safeString('hello')).toBe('hello')
  })
})

describe('truncate', () => {
  test('should not crash when given null', () => {
    expect(() => truncate(null as any, 5)).not.toThrow()
    expect(truncate(null as any, 5)).toBe('')
  })

  test('should not crash when given undefined', () => {
    expect(() => truncate(undefined as any, 10)).not.toThrow()
    expect(truncate(undefined as any, 10)).toBe('')
  })

  test('should return empty string for negative maxLength', () => {
    expect(truncate('hello world', -1)).toBe('')
  })

  test('truncates long string correctly', () => {
    expect(truncate('hello world', 5)).toBe('hello...')
  })

  test('does not truncate short string', () => {
    expect(truncate('hi', 10)).toBe('hi')
  })

  test('handles empty string', () => {
    expect(truncate('', 5)).toBe('')
  })

  test('handles zero maxLength', () => {
    expect(truncate('hello', 0)).toBe('...')
  })
})
