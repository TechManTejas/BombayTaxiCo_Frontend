import { describe, test, expect } from 'vitest'
import { safeDivide, isValidNumber, clamp } from '../../utils/numberUtils'
import { safeDivide as safeDivideMath, isValidNumber as isValidNumberMath } from '../../utils/safeMath'
import { calculateAdvancePayment } from '../../utils/priceCalculations'

describe('numberUtils - safeDivide', () => {
  test('divides two numbers normally', () => {
    expect(safeDivide(10, 2)).toBe(5)
  })

  test('returns fallback for division by zero', () => {
    expect(safeDivide(10, 0)).toBe(0)
    expect(safeDivide(10, 0, -1)).toBe(-1)
  })

  test('should return fallback when numerator is null', () => {
    expect(safeDivide(null as any, 5)).toBe(0)
  })

  test('should return fallback when numerator is undefined', () => {
    expect(safeDivide(undefined as any, 5)).toBe(0)
  })

  test('should return fallback when numerator is NaN', () => {
    expect(safeDivide(NaN, 5)).toBe(0)
  })

  test('should return fallback when denominator is null', () => {
    expect(safeDivide(10, null as any)).toBe(0)
  })

  test('should return fallback when denominator is NaN', () => {
    expect(safeDivide(10, NaN)).toBe(0)
  })
})

describe('numberUtils - isValidNumber', () => {
  test('returns true for normal numbers', () => {
    expect(isValidNumber(42)).toBe(true)
    expect(isValidNumber(0)).toBe(true)
    expect(isValidNumber(-5)).toBe(true)
  })

  test('returns false for NaN', () => {
    expect(isValidNumber(NaN)).toBe(false)
  })

  test('returns false for Infinity', () => {
    expect(isValidNumber(Infinity)).toBe(false)
  })

  test('returns false for strings', () => {
    expect(isValidNumber('42')).toBe(false)
  })

  test('returns false for null', () => {
    expect(isValidNumber(null)).toBe(false)
  })
})

describe('numberUtils - clamp', () => {
  test('clamps value within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  test('clamps to min when below', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  test('clamps to max when above', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  test('should return min when value is NaN', () => {
    expect(clamp(NaN, 0, 10)).toBe(0)
  })

  test('should return min when value is null', () => {
    expect(clamp(null as any, 0, 10)).toBe(0)
  })

  test('should handle min greater than max', () => {
    expect(clamp(5, 10, 0)).toBe(10)
  })
})

describe('safeMath - safeDivide', () => {
  test('divides normally', () => {
    expect(safeDivideMath(10, 2)).toBe(5)
  })

  test('returns fallback for zero denominator', () => {
    expect(safeDivideMath(10, 0)).toBe(0)
  })

  test('should return fallback when first arg is null', () => {
    expect(safeDivideMath(null as any, 5)).toBe(0)
  })

  test('should return fallback when first arg is NaN', () => {
    expect(safeDivideMath(NaN, 5)).toBe(0)
  })

  test('should return fallback when second arg is undefined', () => {
    expect(safeDivideMath(10, undefined as any)).toBe(0)
  })
})

describe('safeMath - isValidNumber', () => {
  test('returns true for valid numbers', () => {
    expect(isValidNumberMath(100)).toBe(true)
  })

  test('returns false for non numbers', () => {
    expect(isValidNumberMath('hello')).toBe(false)
    expect(isValidNumberMath(null)).toBe(false)
  })
})

describe('calculateAdvancePayment', () => {
  test('calculates correctly with number percentage', () => {
    expect(calculateAdvancePayment(1000, 25)).toBe('250')
  })

  test('calculates correctly with string percentage', () => {
    expect(calculateAdvancePayment(2000, '10')).toBe('200')
  })

  test('should return 0 when price is null', () => {
    expect(calculateAdvancePayment(null as any, 25)).toBe('0')
  })

  test('should return 0 when price is undefined', () => {
    expect(calculateAdvancePayment(undefined as any, 10)).toBe('0')
  })

  test('should return 0 when price is NaN', () => {
    expect(calculateAdvancePayment(NaN, 10)).toBe('0')
  })

  test('handles zero price', () => {
    expect(calculateAdvancePayment(0, 25)).toBe('0')
  })

  test('handles invalid string percentage', () => {
    expect(calculateAdvancePayment(1000, 'abc')).toBe('0')
  })
})
