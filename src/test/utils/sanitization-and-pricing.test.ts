import { describe, test, expect } from 'vitest'
import {
  sanitizeInput,
  validateAndSanitizeBooking,
} from '../../utils/bookingValidation'
import { formatPrice, calculateDueAmount } from '../../utils/priceCalculations'

describe('sanitizeInput', () => {
  test('should handle null input without crashing', () => {
    expect(() => sanitizeInput(null as any)).not.toThrow()
    expect(sanitizeInput(null as any)).toBe('')
  })

  test('should handle undefined input without crashing', () => {
    expect(() => sanitizeInput(undefined as any)).not.toThrow()
    expect(sanitizeInput(undefined as any)).toBe('')
  })

  test('should handle empty string', () => {
    expect(sanitizeInput('')).toBe('')
  })

  test('should sanitize XSS characters', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
    )
  })

  test('should trim whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello')
  })
})

describe('validateAndSanitizeBooking', () => {
  test('should handle booking data with null fields without crashing', () => {
    const data = {
      emailId: null as any,
      contactNumber: null as any,
      whatsAppNumber: null as any,
      name: null as any,
      numberOfPassengers: '2',
      pick_up_date: new Date(),
      pick_up_time: '10:00',
    }
    expect(() => validateAndSanitizeBooking(data)).not.toThrow()
  })

  test('should handle booking data with undefined fields', () => {
    const data = {
      emailId: undefined as any,
      contactNumber: undefined as any,
      whatsAppNumber: undefined as any,
      name: undefined as any,
      numberOfPassengers: '1',
      pick_up_date: new Date(),
      pick_up_time: '09:00',
    }
    expect(() => validateAndSanitizeBooking(data)).not.toThrow()
  })

  test('should validate and sanitize valid booking data', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const data = {
      emailId: 'test@example.com',
      contactNumber: '9876543210',
      whatsAppNumber: '9876543210',
      name: 'John Doe',
      numberOfPassengers: '2',
      pick_up_date: tomorrow,
      pick_up_time: '10:00',
    }
    const result = validateAndSanitizeBooking(data)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })
})

describe('formatPrice', () => {
  test('should format zero correctly', () => {
    expect(formatPrice(0)).toBe('₹0')
  })

  test('should format null base fare correctly', () => {
    expect(formatPrice(null as any)).toBe('₹0')
  })

  test('should format undefined base fare correctly', () => {
    expect(formatPrice(undefined as any)).toBe('₹0')
  })

  test('should format valid price', () => {
    expect(formatPrice(1500)).toBe('₹1500')
  })
})

describe('calculateDueAmount', () => {
  test('should return correct due when payments exist', () => {
    const payments = [{ amount: 50000 }, { amount: 30000 }]
    expect(calculateDueAmount(2000, payments)).toBe('₹1200')
  })

  test('should handle null base fare', () => {
    expect(calculateDueAmount(null as any, [])).toBe('---')
  })

  test('should handle empty payments array', () => {
    expect(calculateDueAmount(1500, [])).toBe('₹1500')
  })

  test('should handle null payments', () => {
    expect(calculateDueAmount(1500, null as any)).toBe('₹1500')
  })
})
