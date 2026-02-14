import { describe, test, expect } from 'vitest'
import {
  isValidCouponCode,
  calculateDiscountedPrice,
  formatDiscount,
  isCouponExpired,
} from '../../utils/couponHelpers'

describe('isValidCouponCode', () => {
  test('returns true for valid alphanumeric code', () => {
    expect(isValidCouponCode('SAVE20')).toBe(true)
  })

  test('returns true for lowercase code', () => {
    expect(isValidCouponCode('summer2025')).toBe(true)
  })

  test('returns false for too short code', () => {
    expect(isValidCouponCode('AB')).toBe(false)
  })

  test('returns false for code with special chars', () => {
    expect(isValidCouponCode('SAVE-20!')).toBe(false)
  })

  test('returns false for null', () => {
    expect(isValidCouponCode(null)).toBe(false)
  })

  test('returns false for undefined', () => {
    expect(isValidCouponCode(undefined)).toBe(false)
  })

  test('returns false for empty string', () => {
    expect(isValidCouponCode('')).toBe(false)
  })
})

describe('calculateDiscountedPrice', () => {
  test('calculates 20 percent discount', () => {
    expect(calculateDiscountedPrice(1000, 20)).toBe(800)
  })

  test('calculates with max discount cap', () => {
    expect(calculateDiscountedPrice(5000, 50, 1000)).toBe(4000)
  })

  test('does not exceed max discount', () => {
    expect(calculateDiscountedPrice(10000, 50, 2000)).toBe(8000)
  })

  test('returns 0 for null price', () => {
    expect(calculateDiscountedPrice(null, 20)).toBe(0)
  })

  test('returns 0 for undefined price', () => {
    expect(calculateDiscountedPrice(undefined, 20)).toBe(0)
  })

  test('returns original price for null discount', () => {
    expect(calculateDiscountedPrice(1000, null)).toBe(1000)
  })

  test('returns original price for zero discount', () => {
    expect(calculateDiscountedPrice(1000, 0)).toBe(1000)
  })

  test('caps discount at 100 percent', () => {
    expect(calculateDiscountedPrice(1000, 150)).toBe(0)
  })

  test('returns 0 for negative price', () => {
    expect(calculateDiscountedPrice(-500, 20)).toBe(0)
  })
})

describe('formatDiscount', () => {
  test('formats percentage discount', () => {
    expect(formatDiscount(20)).toBe('20% off')
  })

  test('formats with max discount', () => {
    expect(formatDiscount(50, 2000)).toBe('50% off (up to ₹2000)')
  })

  test('returns empty for null', () => {
    expect(formatDiscount(null)).toBe('')
  })

  test('returns empty for zero', () => {
    expect(formatDiscount(0)).toBe('')
  })

  test('caps at 100 percent', () => {
    expect(formatDiscount(150)).toBe('100% off')
  })
})

describe('isCouponExpired', () => {
  test('returns true for past date', () => {
    expect(isCouponExpired('2020-01-01')).toBe(true)
  })

  test('returns false for future date', () => {
    expect(isCouponExpired('2030-12-31')).toBe(false)
  })

  test('returns true for null', () => {
    expect(isCouponExpired(null)).toBe(true)
  })

  test('returns true for undefined', () => {
    expect(isCouponExpired(undefined)).toBe(true)
  })

  test('returns true for invalid date string', () => {
    expect(isCouponExpired('not-a-date')).toBe(true)
  })
})
