import { describe, test, expect } from 'vitest'
import { safeValue, safeCall, isEmpty } from '../../utils/errorHandlers'

describe('safeValue', () => {
  test('returns value when not null', () => {
    expect(safeValue('hello', 'default')).toBe('hello')
  })

  test('returns fallback for null', () => {
    expect(safeValue(null, 'fallback')).toBe('fallback')
  })

  test('returns fallback for undefined', () => {
    expect(safeValue(undefined, 42)).toBe(42)
  })

  test('returns zero when value is zero', () => {
    expect(safeValue(0, 99)).toBe(0)
  })

  test('returns empty string when value is empty string', () => {
    expect(safeValue('', 'default')).toBe('')
  })
})

describe('safeCall', () => {
  test('returns function result on success', () => {
    expect(safeCall(() => 42, 0)).toBe(42)
  })

  test('returns fallback when function throws', () => {
    expect(safeCall(() => { throw new Error('oops') }, 'default')).toBe('default')
  })

  test('returns fallback for null property access', () => {
    const obj: any = null
    expect(safeCall(() => obj.name, 'unknown')).toBe('unknown')
  })
})

describe('isEmpty', () => {
  test('returns true for null', () => {
    expect(isEmpty(null)).toBe(true)
  })

  test('returns true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true)
  })

  test('returns true for empty string', () => {
    expect(isEmpty('')).toBe(true)
  })

  test('returns true for whitespace only string', () => {
    expect(isEmpty('   ')).toBe(true)
  })

  test('returns true for empty array', () => {
    expect(isEmpty([])).toBe(true)
  })

  test('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true)
  })

  test('returns false for non empty string', () => {
    expect(isEmpty('hello')).toBe(false)
  })

  test('returns false for non empty array', () => {
    expect(isEmpty([1, 2])).toBe(false)
  })

  test('returns false for non empty object', () => {
    expect(isEmpty({ key: 'value' })).toBe(false)
  })

  test('returns false for number', () => {
    expect(isEmpty(42)).toBe(false)
  })
})
