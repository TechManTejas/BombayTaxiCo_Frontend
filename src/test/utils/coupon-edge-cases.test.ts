import { describe, test, expect } from 'vitest'
import {
  isValidCouponCode,
  calculateDiscountedPrice,
  formatDiscount,
  isCouponExpired,
} from '../../utils/couponHelpers'

describe('isValidCouponCode edge cases', () => {
  // F2P: base code rejects hyphens and underscores which are common in coupon codes
  test('accepts code with hyphens like SAVE-50', () => {
    expect(isValidCouponCode('SAVE-50')).toBe(true)
  })

  test('accepts code with underscores like NEW_USER', () => {
    expect(isValidCouponCode('NEW_USER')).toBe(true)
  })

  test('accepts code with mixed hyphens and underscores', () => {
    expect(isValidCouponCode('BTC-NEW_25')).toBe(true)
  })

  // P2P tests
  test('rejects code with exclamation mark', () => {
    expect(isValidCouponCode('SAVE!')).toBe(false)
  })

  test('rejects code with spaces', () => {
    expect(isValidCouponCode('SAVE 50')).toBe(false)
  })

  test('accepts valid alphanumeric code', () => {
    expect(isValidCouponCode('SUMMER2025')).toBe(true)
  })

  test('rejects code shorter than 4 chars', () => {
    expect(isValidCouponCode('AB')).toBe(false)
  })

  test('rejects code longer than 20 chars', () => {
    expect(isValidCouponCode('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe(false)
  })
})

describe('calculateDiscountedPrice edge cases', () => {
  // F2P: base code uses !originalPrice which crashes on NaN
  test('returns 0 for NaN price', () => {
    expect(calculateDiscountedPrice(NaN, 20)).toBe(0)
  })

  // P2P tests
  test('calculates 10 percent discount', () => {
    expect(calculateDiscountedPrice(2000, 10)).toBe(1800)
  })

  test('returns original price for negative discount', () => {
    expect(calculateDiscountedPrice(1000, -5)).toBe(1000)
  })

  test('returns 0 for zero price', () => {
    expect(calculateDiscountedPrice(0, 20)).toBe(0)
  })

  test('caps discount at 100 percent', () => {
    expect(calculateDiscountedPrice(500, 200)).toBe(0)
  })
})

describe('formatDiscount additional', () => {
  test('formats small percentage', () => {
    expect(formatDiscount(5)).toBe('5% off')
  })

  test('returns empty for negative', () => {
    expect(formatDiscount(-10)).toBe('')
  })
})

describe('isCouponExpired additional', () => {
  test('returns true for empty string', () => {
    expect(isCouponExpired('')).toBe(true)
  })

  test('returns false for far future date', () => {
    expect(isCouponExpired('2099-01-01')).toBe(false)
  })
})
