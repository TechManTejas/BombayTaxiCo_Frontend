import { describe, test, expect } from 'vitest'
import { formatPrice, calculateDueAmount, calculateAdvancePayment } from '../../utils/priceCalculations'

describe('formatPrice edge cases', () => {
  // F2P: base code outputs '₹99.99' instead of '₹100' for decimal amounts
  test('rounds decimal amounts instead of showing raw float', () => {
    expect(formatPrice(99.99)).toBe('₹100')
  })

  test('rounds down when below .5', () => {
    expect(formatPrice(99.3)).toBe('₹99')
  })

  test('rounds floating point correctly', () => {
    expect(formatPrice(1499.7)).toBe('₹1500')
  })

  // F2P: base code doesn't handle NaN
  test('returns ₹0 for NaN amount', () => {
    expect(formatPrice(NaN)).toBe('₹0')
  })

  // P2P tests
  test('formats integer amount correctly', () => {
    expect(formatPrice(500)).toBe('₹500')
  })

  test('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('₹0')
  })

  test('handles negative amount', () => {
    expect(formatPrice(-200)).toBe('₹-200')
  })
})

describe('calculateDueAmount edge cases', () => {
  // F2P: base code produces '₹1199.5' instead of '₹1200' for odd paise amounts
  test('rounds result when paise conversion produces decimals', () => {
    const payments = [{ amount: 50050 }]
    expect(calculateDueAmount(2000, payments)).toBe('₹1500')
  })

  // P2P tests
  test('returns --- for zero base fare', () => {
    expect(calculateDueAmount(0, [])).toBe('---')
  })

  test('handles no payments', () => {
    expect(calculateDueAmount(3000, null)).toBe('₹3000')
  })
})

describe('calculateAdvancePayment', () => {
  // P2P tests
  test('calculates percentage correctly', () => {
    expect(calculateAdvancePayment(10000, 25)).toBe('2,500')
  })

  test('handles string percentage', () => {
    expect(calculateAdvancePayment(5000, '20')).toBe('1,000')
  })

  test('returns 0 for NaN price', () => {
    expect(calculateAdvancePayment(NaN, 10)).toBe('0')
  })

  test('returns 0 for null price', () => {
    expect(calculateAdvancePayment(null as any, 10)).toBe('0')
  })
})
