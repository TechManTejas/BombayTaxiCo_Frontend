/**
 * Application constants for consistent values
 */

export const VALIDATION_RULES = {
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 10,
    PATTERN: /^[6-9]\d{9}$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  PASSENGERS: {
    MIN: 1,
    MAX: 8,
  },
} as const;

export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid 10-digit phone number',
  INVALID_NAME: 'Please enter a valid name',
  REQUIRED_FIELD: 'This field is required',
} as const;

export const PHONE_FORMATS = {
  INDIAN: '+91',
  INTERNATIONAL: '+1',
} as const;
