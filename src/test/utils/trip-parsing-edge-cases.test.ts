import { describe, test, expect } from 'vitest'
import {
  parseHourlyPackage,
  calculateExtraKmCharges,
  formatDistance,
  formatDuration,
  estimateTripDuration,
} from '../../utils/tripCalculations'

describe('parseHourlyPackage edge cases', () => {
  // F2P: base code uses split(' ') with hardcoded indices, breaks on compact formats
  test('parses compact format without spaces like "8hr 80kms"', () => {
    const result = parseHourlyPackage('8hr 80kms')
    expect(result.hours).toBe(8)
    expect(result.kms).toBe(80)
  })

  test('parses format with extra spaces', () => {
    const result = parseHourlyPackage('8  hr  80  kms')
    expect(result.hours).toBe(8)
    expect(result.kms).toBe(80)
  })

  test('parses format with no space between number and unit', () => {
    const result = parseHourlyPackage('10hr 100kms')
    expect(result.hours).toBe(10)
    expect(result.kms).toBe(100)
  })

  // P2P tests
  test('parses standard format correctly', () => {
    const result = parseHourlyPackage('8 hr 80 kms')
    expect(result.hours).toBe(8)
    expect(result.kms).toBe(80)
  })

  test('returns zeros for null', () => {
    const result = parseHourlyPackage(null)
    expect(result.hours).toBe(0)
    expect(result.kms).toBe(0)
  })

  test('returns zeros for empty string', () => {
    const result = parseHourlyPackage('')
    expect(result.hours).toBe(0)
    expect(result.kms).toBe(0)
  })

  test('returns zeros for string with only one number', () => {
    const result = parseHourlyPackage('8 hr')
    expect(result.hours).toBe(0)
    expect(result.kms).toBe(0)
  })
})

describe('calculateExtraKmCharges edge cases', () => {
  // F2P: base code uses !ratePerKm which treats 0 as falsy
  test('returns 0 charge when rate is 0 per km', () => {
    expect(calculateExtraKmCharges(150, 100, 0)).toBe(0)
  })

  // P2P tests
  test('calculates charges for extra km', () => {
    expect(calculateExtraKmCharges(200, 100, 15)).toBe(1500)
  })

  test('returns 0 when within included km', () => {
    expect(calculateExtraKmCharges(50, 100, 15)).toBe(0)
  })

  test('returns 0 for null rate', () => {
    expect(calculateExtraKmCharges(150, 100, null)).toBe(0)
  })

  test('returns 0 for undefined rate', () => {
    expect(calculateExtraKmCharges(150, 100, undefined)).toBe(0)
  })

  test('returns 0 for NaN rate', () => {
    expect(calculateExtraKmCharges(150, 100, NaN)).toBe(0)
  })
})

describe('formatDistance additional', () => {
  test('formats exact 1 km', () => {
    expect(formatDistance(1)).toBe('1.0 km')
  })

  test('formats large distance', () => {
    expect(formatDistance(350)).toBe('350.0 km')
  })
})

describe('formatDuration additional', () => {
  test('formats exactly 1 hour', () => {
    expect(formatDuration(1)).toBe('1 hr')
  })

  test('formats fractional hours', () => {
    expect(formatDuration(1.75)).toBe('1 hr 45 min')
  })

  test('returns 0 min for undefined', () => {
    expect(formatDuration(undefined)).toBe('0 min')
  })
})

describe('estimateTripDuration additional', () => {
  test('rounds to one decimal place', () => {
    expect(estimateTripDuration(25)).toBe(0.6)
  })

  test('handles NaN distance', () => {
    expect(estimateTripDuration(NaN)).toBe(0)
  })
})
