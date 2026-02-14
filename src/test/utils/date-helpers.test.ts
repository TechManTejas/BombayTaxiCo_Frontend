import { describe, test, expect } from 'vitest'
import dayjs from 'dayjs'
import {
  safeParseDate,
  isDateInPast,
  formatDateForApi,
  getCancellationDeadline,
  formatDisplayDate,
  daysBetween,
} from '../../utils/dateHelpers'

describe('safeParseDate', () => {
  test('parses valid date string', () => {
    const result = safeParseDate('2025-06-15')
    expect(result.isValid()).toBe(true)
    expect(result.format('YYYY-MM-DD')).toBe('2025-06-15')
  })

  test('returns current date for null', () => {
    const result = safeParseDate(null)
    expect(result.isValid()).toBe(true)
  })

  test('returns current date for undefined', () => {
    const result = safeParseDate(undefined)
    expect(result.isValid()).toBe(true)
  })

  test('returns current date for invalid string', () => {
    const result = safeParseDate('not-a-date')
    expect(result.isValid()).toBe(true)
  })
})

describe('isDateInPast', () => {
  test('returns true for past date', () => {
    const pastDate = dayjs('2020-01-01')
    expect(isDateInPast(pastDate)).toBe(true)
  })

  test('returns false for future date', () => {
    const futureDate = dayjs().add(30, 'day')
    expect(isDateInPast(futureDate)).toBe(false)
  })

  test('should return false for null input instead of crashing', () => {
    expect(() => isDateInPast(null)).not.toThrow()
    expect(isDateInPast(null)).toBe(false)
  })

  test('should return false for undefined input instead of crashing', () => {
    expect(() => isDateInPast(undefined)).not.toThrow()
    expect(isDateInPast(undefined)).toBe(false)
  })
})

describe('formatDateForApi', () => {
  test('formats valid date', () => {
    const date = dayjs('2025-03-15')
    expect(formatDateForApi(date)).toBe('2025-03-15')
  })

  test('returns current date for null', () => {
    const result = formatDateForApi(null)
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

describe('getCancellationDeadline', () => {
  test('returns 2 hours before pickup', () => {
    const result = getCancellationDeadline('2025-06-15', '14:00')
    expect(result.format('HH:mm')).toBe('12:00')
  })

  test('should handle null pickupDate without crashing', () => {
    expect(() => getCancellationDeadline(null, '10:00')).not.toThrow()
    const result = getCancellationDeadline(null, '10:00')
    expect(result.isValid()).toBe(true)
  })

  test('should handle null pickupTime without crashing', () => {
    expect(() => getCancellationDeadline('2025-06-15', null)).not.toThrow()
    const result = getCancellationDeadline('2025-06-15', null)
    expect(result.isValid()).toBe(true)
  })

  test('should handle both null without crashing', () => {
    expect(() => getCancellationDeadline(null, null)).not.toThrow()
  })
})

describe('formatDisplayDate', () => {
  test('formats a valid date string', () => {
    expect(formatDisplayDate('2025-06-15')).toBe('15 Jun 2025')
  })

  test('returns N/A for null', () => {
    expect(formatDisplayDate(null)).toBe('N/A')
  })

  test('returns N/A for undefined', () => {
    expect(formatDisplayDate(undefined)).toBe('N/A')
  })

  test('returns Invalid Date for garbage string', () => {
    expect(formatDisplayDate('not-a-date')).toBe('Invalid Date')
  })
})

describe('daysBetween', () => {
  test('calculates days between two dates', () => {
    expect(daysBetween('2025-01-01', '2025-01-10')).toBe(9)
  })

  test('returns positive value regardless of order', () => {
    expect(daysBetween('2025-01-10', '2025-01-01')).toBe(9)
  })

  test('returns 0 for null start', () => {
    expect(daysBetween(null, '2025-01-10')).toBe(0)
  })

  test('returns 0 for null end', () => {
    expect(daysBetween('2025-01-01', null)).toBe(0)
  })

  test('returns 0 for same date', () => {
    expect(daysBetween('2025-01-01', '2025-01-01')).toBe(0)
  })
})
