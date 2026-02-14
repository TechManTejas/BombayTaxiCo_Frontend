import { describe, test, expect } from 'vitest'
import {
  validateBookingData,
  sanitizeInput,
  validateAndSanitizeBooking,
} from '../../utils/bookingValidation'

describe('validateBookingData', () => {
  const validBooking = {
    emailId: 'test@example.com',
    contactNumber: '9876543210',
    whatsAppNumber: '9876543210',
    name: 'John Doe',
    pickup_address: '123 Main Street, Mumbai',
    drop_address: '456 Park Avenue, Pune',
    numberOfPassengers: '2',
    pick_up_date: new Date(Date.now() + 86400000),
    pick_up_time: '10:30',
  }

  test('returns valid for correct booking data', () => {
    const result = validateBookingData(validBooking)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  test('should not crash when data is null', () => {
    expect(() => validateBookingData(null as any)).not.toThrow()
    const result = validateBookingData(null as any)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  test('should not crash when data is undefined', () => {
    expect(() => validateBookingData(undefined as any)).not.toThrow()
    const result = validateBookingData(undefined as any)
    expect(result.isValid).toBe(false)
  })

  test('rejects invalid email', () => {
    const result = validateBookingData({ ...validBooking, emailId: 'not-an-email' })
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Please enter a valid email address')
  })

  test('rejects invalid phone number', () => {
    const result = validateBookingData({ ...validBooking, contactNumber: '12345' })
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Please enter a valid 10-digit phone number')
  })

  test('rejects short name', () => {
    const result = validateBookingData({ ...validBooking, name: 'A' })
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Name must be at least 2 characters long')
  })

  test('rejects invalid passenger count', () => {
    const result = validateBookingData({ ...validBooking, numberOfPassengers: '0' })
    expect(result.isValid).toBe(false)
  })

  test('rejects too many passengers', () => {
    const result = validateBookingData({ ...validBooking, numberOfPassengers: '15' })
    expect(result.isValid).toBe(false)
  })

  test('rejects invalid time format', () => {
    const result = validateBookingData({ ...validBooking, pick_up_time: '25:00' })
    expect(result.isValid).toBe(false)
  })

  test('accepts valid time format', () => {
    const result = validateBookingData({ ...validBooking, pick_up_time: '09:30' })
    expect(result.isValid).toBe(true)
  })
})

describe('sanitizeInput', () => {
  test('escapes HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toContain('&lt;')
    expect(sanitizeInput('<script>alert("xss")</script>')).toContain('&gt;')
  })

  test('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello')
  })

  test('handles null without crashing', () => {
    expect(sanitizeInput(null as any)).toBe('')
  })

  test('handles undefined without crashing', () => {
    expect(sanitizeInput(undefined as any)).toBe('')
  })

  test('handles numeric input', () => {
    expect(sanitizeInput(12345 as any)).toBe('12345')
  })
})

describe('validateAndSanitizeBooking', () => {
  test('should not crash when data is null', () => {
    expect(() => validateAndSanitizeBooking(null as any)).not.toThrow()
    const result = validateAndSanitizeBooking(null as any)
    expect(result.isValid).toBe(false)
    expect(result.sanitizedData).toBeDefined()
  })

  test('should not crash when data is undefined', () => {
    expect(() => validateAndSanitizeBooking(undefined as any)).not.toThrow()
    const result = validateAndSanitizeBooking(undefined as any)
    expect(result.isValid).toBe(false)
  })

  test('sanitizes and validates valid data', () => {
    const data = {
      emailId: 'test@example.com',
      contactNumber: '9876543210',
      whatsAppNumber: '9876543210',
      name: 'John Doe',
      numberOfPassengers: '3',
      pick_up_date: new Date(Date.now() + 86400000),
      pick_up_time: '14:00',
    }
    const result = validateAndSanitizeBooking(data)
    expect(result.sanitizedData).toBeDefined()
    expect(result.sanitizedData.name).toBe('John Doe')
  })

  test('sanitizes XSS in name field', () => {
    const data = {
      emailId: 'test@example.com',
      contactNumber: '9876543210',
      whatsAppNumber: '',
      name: '<script>alert("xss")</script>',
      numberOfPassengers: '2',
      pick_up_date: new Date(Date.now() + 86400000),
      pick_up_time: '10:00',
    }
    const result = validateAndSanitizeBooking(data)
    expect(result.sanitizedData.name).not.toContain('<script>')
  })
})
