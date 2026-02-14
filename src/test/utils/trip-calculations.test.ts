import { describe, test, expect } from 'vitest'
import {
  estimateTripDuration,
  calculateExtraKmCharges,
  formatDistance,
  formatDuration,
  parseHourlyPackage,
  calculateTotalTripCost,
} from '../../utils/tripCalculations'

describe('estimateTripDuration', () => {
  test('calculates city trip duration', () => {
    expect(estimateTripDuration(120)).toBe(3)
  })

  test('calculates highway trip duration', () => {
    expect(estimateTripDuration(120, true)).toBe(2)
  })

  test('returns 0 for null distance', () => {
    expect(estimateTripDuration(null)).toBe(0)
  })

  test('returns 0 for undefined distance', () => {
    expect(estimateTripDuration(undefined)).toBe(0)
  })

  test('returns 0 for negative distance', () => {
    expect(estimateTripDuration(-50)).toBe(0)
  })

  test('returns 0 for zero distance', () => {
    expect(estimateTripDuration(0)).toBe(0)
  })
})

describe('calculateExtraKmCharges', () => {
  test('calculates extra charges correctly', () => {
    expect(calculateExtraKmCharges(150, 100, 12)).toBe(600)
  })

  test('returns 0 when within included km', () => {
    expect(calculateExtraKmCharges(80, 100, 12)).toBe(0)
  })

  test('returns 0 for null actual km', () => {
    expect(calculateExtraKmCharges(null, 100, 12)).toBe(0)
  })

  test('returns 0 for null included km', () => {
    expect(calculateExtraKmCharges(150, null, 12)).toBe(0)
  })

  test('returns 0 for null rate', () => {
    expect(calculateExtraKmCharges(150, 100, null)).toBe(0)
  })

  test('returns 0 when exactly at included km', () => {
    expect(calculateExtraKmCharges(100, 100, 12)).toBe(0)
  })
})

describe('formatDistance', () => {
  test('formats km distance', () => {
    expect(formatDistance(45.5)).toBe('45.5 km')
  })

  test('formats meters for small distances', () => {
    expect(formatDistance(0.5)).toBe('500 m')
  })

  test('returns 0 km for null', () => {
    expect(formatDistance(null)).toBe('0 km')
  })

  test('returns 0 km for undefined', () => {
    expect(formatDistance(undefined)).toBe('0 km')
  })

  test('returns 0 km for NaN', () => {
    expect(formatDistance(NaN)).toBe('0 km')
  })
})

describe('formatDuration', () => {
  test('formats hours and minutes', () => {
    expect(formatDuration(2.5)).toBe('2 hr 30 min')
  })

  test('formats whole hours', () => {
    expect(formatDuration(3)).toBe('3 hr')
  })

  test('formats minutes only for less than 1 hour', () => {
    expect(formatDuration(0.5)).toBe('30 min')
  })

  test('returns 0 min for null', () => {
    expect(formatDuration(null)).toBe('0 min')
  })

  test('returns 0 min for zero', () => {
    expect(formatDuration(0)).toBe('0 min')
  })

  test('returns 0 min for negative', () => {
    expect(formatDuration(-2)).toBe('0 min')
  })
})

describe('parseHourlyPackage', () => {
  test('parses standard package string', () => {
    const result = parseHourlyPackage('8 hr 80 kms')
    expect(result.hours).toBe(8)
    expect(result.kms).toBe(80)
  })

  test('parses different package', () => {
    const result = parseHourlyPackage('10 hr 100 kms')
    expect(result.hours).toBe(10)
    expect(result.kms).toBe(100)
  })

  test('returns zeros for null', () => {
    const result = parseHourlyPackage(null)
    expect(result.hours).toBe(0)
    expect(result.kms).toBe(0)
  })

  test('returns zeros for undefined', () => {
    const result = parseHourlyPackage(undefined)
    expect(result.hours).toBe(0)
    expect(result.kms).toBe(0)
  })

  test('returns zeros for empty string', () => {
    const result = parseHourlyPackage('')
    expect(result.hours).toBe(0)
    expect(result.kms).toBe(0)
  })
})

describe('calculateTotalTripCost', () => {
  test('calculates total with all components', () => {
    expect(calculateTotalTripCost(5000, 600, 200, 300)).toBe(6100)
  })

  test('calculates with base fare only', () => {
    expect(calculateTotalTripCost(5000)).toBe(5000)
  })

  test('returns 0 for null base fare', () => {
    expect(calculateTotalTripCost(null)).toBe(0)
  })

  test('returns extras even with null base fare', () => {
    expect(calculateTotalTripCost(null, 100, 50)).toBe(150)
  })

  test('handles NaN base fare', () => {
    expect(calculateTotalTripCost(NaN, 100)).toBe(100)
  })
})
