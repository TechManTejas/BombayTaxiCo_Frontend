/**
 * Booking status display helpers
 */

import { BookingStatus } from '../types/bookings.types';

/**
 * Returns a user-friendly label for a booking status
 */
export const getStatusLabel = (status: BookingStatus | null | undefined): string => {
  if (!status) return 'Unknown';
  switch (status) {
    case BookingStatus.New:
      return 'New Booking';
    case BookingStatus.Rescheduled:
      return 'Rescheduled';
    case BookingStatus.Confirmed:
      return 'Confirmed';
    case BookingStatus.OnRide:
      return 'On Ride';
    case BookingStatus.Completed:
      return 'Completed';
    case BookingStatus.Cancelled:
      return 'Cancelled';
    case BookingStatus.CancelledByUser:
      return 'Cancelled by User';
    default:
      return 'Unknown';
  }
};

/**
 * Returns a color code for a booking status
 */
export const getStatusColor = (status: BookingStatus | null | undefined): string => {
  if (!status) return '#999999';
  switch (status) {
    case BookingStatus.New:
      return '#1890ff';
    case BookingStatus.Rescheduled:
      return '#fa8c16';
    case BookingStatus.Confirmed:
      return '#52c41a';
    case BookingStatus.OnRide:
      return '#722ed1';
    case BookingStatus.Completed:
      return '#8c8c8c';
    case BookingStatus.Cancelled:
    case BookingStatus.CancelledByUser:
      return '#ff4d4f';
    default:
      return '#999999';
  }
};

/**
 * Checks if a booking can be cancelled based on its status
 */
export const isCancellable = (status: BookingStatus | null | undefined): boolean => {
  if (!status) return false;
  return status === BookingStatus.New || 
         status === BookingStatus.Confirmed || 
         status === BookingStatus.Rescheduled;
};

/**
 * Checks if a booking is in a terminal state
 */
export const isTerminalStatus = (status: BookingStatus | null | undefined): boolean => {
  if (!status) return false;
  return status === BookingStatus.Completed || 
         status === BookingStatus.Cancelled || 
         status === BookingStatus.CancelledByUser;
};
