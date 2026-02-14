import { describe, test, expect } from 'vitest'
import { BookingStatus } from '../../types/bookings.types'
import {
  getStatusLabel,
  getStatusColor,
  isCancellable,
  isTerminalStatus,
} from '../../utils/bookingStatusHelpers'

describe('getStatusLabel', () => {
  test('returns New Booking for New status', () => {
    expect(getStatusLabel(BookingStatus.New)).toBe('New Booking')
  })

  test('returns Confirmed for Confirmed status', () => {
    expect(getStatusLabel(BookingStatus.Confirmed)).toBe('Confirmed')
  })

  test('returns Cancelled by User for CancelledByUser', () => {
    expect(getStatusLabel(BookingStatus.CancelledByUser)).toBe('Cancelled by User')
  })

  test('returns Unknown for null', () => {
    expect(getStatusLabel(null)).toBe('Unknown')
  })

  test('returns Unknown for undefined', () => {
    expect(getStatusLabel(undefined)).toBe('Unknown')
  })

  test('returns On Ride for OnRide status', () => {
    expect(getStatusLabel(BookingStatus.OnRide)).toBe('On Ride')
  })
})

describe('getStatusColor', () => {
  test('returns blue for New', () => {
    expect(getStatusColor(BookingStatus.New)).toBe('#1890ff')
  })

  test('returns green for Confirmed', () => {
    expect(getStatusColor(BookingStatus.Confirmed)).toBe('#52c41a')
  })

  test('returns red for Cancelled', () => {
    expect(getStatusColor(BookingStatus.Cancelled)).toBe('#ff4d4f')
  })

  test('returns grey for null', () => {
    expect(getStatusColor(null)).toBe('#999999')
  })

  test('returns purple for OnRide', () => {
    expect(getStatusColor(BookingStatus.OnRide)).toBe('#722ed1')
  })
})

describe('isCancellable', () => {
  test('returns true for New booking', () => {
    expect(isCancellable(BookingStatus.New)).toBe(true)
  })

  test('returns true for Confirmed booking', () => {
    expect(isCancellable(BookingStatus.Confirmed)).toBe(true)
  })

  test('returns true for Rescheduled booking', () => {
    expect(isCancellable(BookingStatus.Rescheduled)).toBe(true)
  })

  test('returns false for Completed booking', () => {
    expect(isCancellable(BookingStatus.Completed)).toBe(false)
  })

  test('returns false for already Cancelled booking', () => {
    expect(isCancellable(BookingStatus.Cancelled)).toBe(false)
  })

  test('returns false for null', () => {
    expect(isCancellable(null)).toBe(false)
  })

  test('returns false for undefined', () => {
    expect(isCancellable(undefined)).toBe(false)
  })
})

describe('isTerminalStatus', () => {
  test('returns true for Completed', () => {
    expect(isTerminalStatus(BookingStatus.Completed)).toBe(true)
  })

  test('returns true for Cancelled', () => {
    expect(isTerminalStatus(BookingStatus.Cancelled)).toBe(true)
  })

  test('returns true for CancelledByUser', () => {
    expect(isTerminalStatus(BookingStatus.CancelledByUser)).toBe(true)
  })

  test('returns false for New', () => {
    expect(isTerminalStatus(BookingStatus.New)).toBe(false)
  })

  test('returns false for OnRide', () => {
    expect(isTerminalStatus(BookingStatus.OnRide)).toBe(false)
  })

  test('returns false for null', () => {
    expect(isTerminalStatus(null)).toBe(false)
  })
})
