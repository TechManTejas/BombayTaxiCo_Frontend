/**
 * Date handling utilities for booking operations
 */
import dayjs, { Dayjs } from 'dayjs';

/**
 * Safely parses a date string into a Dayjs object
 * Returns current date if input is invalid
 */
export const safeParseDate = (dateStr: string | null | undefined): Dayjs => {
  if (!dateStr) return dayjs();
  const parsed = dayjs(dateStr);
  return parsed.isValid() ? parsed : dayjs();
};

/**
 * Checks if a date is in the past
 */
export const isDateInPast = (date: Dayjs | null | undefined): boolean => {
  if (!date || !date.isValid()) return false;
  return date.isBefore(dayjs(), 'day');
};

/**
 * Formats a date for API requests
 */
export const formatDateForApi = (date: Dayjs | null | undefined): string => {
  if (!date || !date.isValid()) return dayjs().format('YYYY-MM-DD');
  return date.format('YYYY-MM-DD');
};

/**
 * Calculates the cancellation deadline (2 hours before pickup)
 */
export const getCancellationDeadline = (
  pickupDate: string | null | undefined,
  pickupTime: string | null | undefined
): Dayjs => {
  if (!pickupDate) return dayjs();
  const timeStr = pickupTime || '00:00';
  const dateTime = dayjs(`${pickupDate} ${timeStr}`);
  if (!dateTime.isValid()) return dayjs();
  return dateTime.subtract(2, 'hour');
};

/**
 * Formats a date for user-friendly display
 */
export const formatDisplayDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return 'N/A';
  const parsed = dayjs(dateStr);
  if (!parsed.isValid()) return 'Invalid Date';
  return parsed.format('DD MMM YYYY');
};

/**
 * Gets the number of days between two dates
 */
export const daysBetween = (
  startDate: string | null | undefined,
  endDate: string | null | undefined
): number => {
  if (!startDate || !endDate) return 0;
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  if (!start.isValid() || !end.isValid()) return 0;
  return Math.abs(end.diff(start, 'day'));
};
