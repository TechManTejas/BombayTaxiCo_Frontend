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
export const isDateInPast = (date: Dayjs): boolean => {
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
  pickupDate: string,
  pickupTime: string
): Dayjs => {
  const dateTime = dayjs(`${pickupDate} ${pickupTime}`);
  if (!dateTime.isValid()) return dayjs();
  return dateTime.subtract(2, 'hour');
};
