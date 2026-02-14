import { renderHook } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import useCounter from '../../components/Counter'
import { validateBookingData } from '../../utils/bookingValidation'

describe('Critical Bug Fixes', () => {
  describe('Counter Edge Cases', () => {
    test('should handle zero end value without crashing', () => {
      // F2P Test: FAILS in base (division by zero), PASSES after fix
      expect(() => {
        renderHook(() => useCounter(0, 1000))
      }).not.toThrow()
    })

    test('should handle negative end value gracefully', () => {
      // F2P Test: FAILS in base (negative interval), PASSES after fix
      expect(() => {
        renderHook(() => useCounter(-5, 1000))
      }).not.toThrow()
    })

    test('should work normally with positive values', () => {
      // P2P Test: PASSES in both base and after
      const { result } = renderHook(() => useCounter(5, 1000))
      expect(result.current).toBe(0)
    })

    test('should handle large end values', () => {
      // P2P Test: PASSES in both base and after
      expect(() => {
        renderHook(() => useCounter(1000, 5000))
      }).not.toThrow()
    })
  })

  describe('Booking Validation Edge Cases', () => {
    test('should handle phone numbers with special characters', () => {
      // F2P Test: FAILS in base (regex issue), PASSES after fix
      const bookingData = {
        emailId: 'test@example.com',
        contactNumber: '+91-98765-43210',
        whatsAppNumber: '',
        name: 'Test User',
        numberOfPassengers: '2',
        pick_up_date: new Date(),
        pick_up_time: '10:00'
      }
      
      const result = validateBookingData(bookingData)
      expect(result.isValid).toBe(true)
    })

    test('should handle empty contact number gracefully', () => {
      // F2P Test: FAILS in base (null handling), PASSES after fix
      const bookingData = {
        emailId: 'test@example.com',
        contactNumber: '',
        whatsAppNumber: '',
        name: 'Test User',
        numberOfPassengers: '2',
        pick_up_date: new Date(),
        pick_up_time: '10:00'
      }
      
      const result = validateBookingData(bookingData)
      expect(result.errors).toContain('Please enter a valid 10-digit phone number')
    })

    test('should validate normal booking data correctly', () => {
      // P2P Test: PASSES in both base and after
      const bookingData = {
        emailId: 'test@example.com',
        contactNumber: '9876543210',
        whatsAppNumber: '9876543210',
        name: 'Test User',
        numberOfPassengers: '2',
        pick_up_date: new Date(),
        pick_up_time: '10:00'
      }
      
      const result = validateBookingData(bookingData)
      expect(result.isValid).toBe(true)
    })
  })
})
