import { describe, test, expect } from 'vitest'
import { isValidIndianPhone, isValidEmail, extractDigits } from '../../utils/validationHelpers'
import { safeLength, isEmpty, uniqueBy } from '../../utils/arrayHelpers'
import { VALIDATION_RULES, ERROR_MESSAGES } from '../../utils/constants'

describe('isValidIndianPhone', () => {
  test('returns true for valid 10 digit number starting with 9', () => {
    expect(isValidIndianPhone('9876543210')).toBe(true)
  })

  test('returns true for valid number starting with 7', () => {
    expect(isValidIndianPhone('7012345678')).toBe(true)
  })

  test('returns false for number starting with 5', () => {
    expect(isValidIndianPhone('5123456789')).toBe(false)
  })

  test('returns false for short number', () => {
    expect(isValidIndianPhone('98765')).toBe(false)
  })

  test('should not crash on null input', () => {
    expect(() => isValidIndianPhone(null as any)).not.toThrow()
    expect(isValidIndianPhone(null as any)).toBe(false)
  })

  test('should not crash on undefined input', () => {
    expect(() => isValidIndianPhone(undefined as any)).not.toThrow()
    expect(isValidIndianPhone(undefined as any)).toBe(false)
  })

  test('should handle numeric input without crashing', () => {
    expect(() => isValidIndianPhone(9876543210 as any)).not.toThrow()
    expect(isValidIndianPhone(9876543210 as any)).toBe(true)
  })

  test('returns false for empty string', () => {
    expect(isValidIndianPhone('')).toBe(false)
  })
})

describe('isValidEmail', () => {
  test('returns true for valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
  })

  test('returns false for invalid email', () => {
    expect(isValidEmail('notanemail')).toBe(false)
  })

  test('returns false for empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })

  test('returns false for null', () => {
    expect(isValidEmail(null as any)).toBe(false)
  })
})

describe('extractDigits', () => {
  test('extracts digits from mixed string', () => {
    expect(extractDigits('abc123def456')).toBe('123456')
  })

  test('returns empty for no digits', () => {
    expect(extractDigits('hello')).toBe('')
  })

  test('should not crash on null input', () => {
    expect(() => extractDigits(null as any)).not.toThrow()
    expect(extractDigits(null as any)).toBe('')
  })

  test('should not crash on undefined input', () => {
    expect(() => extractDigits(undefined as any)).not.toThrow()
    expect(extractDigits(undefined as any)).toBe('')
  })

  test('should handle numeric input', () => {
    expect(() => extractDigits(12345 as any)).not.toThrow()
    expect(extractDigits(12345 as any)).toBe('12345')
  })
})

describe('safeLength', () => {
  test('returns length of array', () => {
    expect(safeLength([1, 2, 3])).toBe(3)
  })

  test('returns 0 for null', () => {
    expect(safeLength(null)).toBe(0)
  })

  test('returns 0 for undefined', () => {
    expect(safeLength(undefined)).toBe(0)
  })

  test('returns 0 for non array object', () => {
    expect(safeLength({})).toBe(0)
  })

  test('should return string length for string input', () => {
    expect(safeLength('hello')).toBe(5)
  })

  test('returns 0 for empty array', () => {
    expect(safeLength([])).toBe(0)
  })
})

describe('arrayHelpers - isEmpty', () => {
  test('returns true for empty array', () => {
    expect(isEmpty([])).toBe(true)
  })

  test('returns false for non empty array', () => {
    expect(isEmpty([1])).toBe(false)
  })

  test('returns true for null', () => {
    expect(isEmpty(null)).toBe(true)
  })
})

describe('uniqueBy', () => {
  test('removes duplicates by key', () => {
    const items = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 1, name: 'c' },
    ]
    const result = uniqueBy(items, item => item.id)
    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('a')
  })

  test('returns empty array for non array input', () => {
    expect(uniqueBy(null as any, (x: any) => x)).toEqual([])
  })

  test('returns same array if no duplicates', () => {
    const items = [{ id: 1 }, { id: 2 }]
    expect(uniqueBy(items, item => item.id)).toHaveLength(2)
  })
})

describe('constants', () => {
  test('VALIDATION_RULES has phone pattern', () => {
    expect(VALIDATION_RULES.PHONE.PATTERN).toBeDefined()
    expect(VALIDATION_RULES.PHONE.MIN_LENGTH).toBe(10)
  })

  test('VALIDATION_RULES has passenger limits', () => {
    expect(VALIDATION_RULES.PASSENGERS.MIN).toBe(1)
    expect(VALIDATION_RULES.PASSENGERS.MAX).toBe(8)
  })

  test('ERROR_MESSAGES has required messages', () => {
    expect(ERROR_MESSAGES.INVALID_EMAIL).toBeDefined()
    expect(ERROR_MESSAGES.INVALID_PHONE).toBeDefined()
    expect(ERROR_MESSAGES.REQUIRED_FIELD).toBeDefined()
  })
})
