/**
 * Booking validation utilities
 * Ensures data integrity and user input validation
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface BookingData {
  emailId: string;
  contactNumber: string;
  whatsAppNumber: string;
  name: string;
  pickup_address?: string;
  drop_address?: string;
  numberOfPassengers: string;
  pick_up_date: Date;
  pick_up_time: string;
}

/**
 * Validates booking form data
 * @param data - Booking data to validate
 * @returns ValidationResult with validation status and error messages
 */
export const validateBookingData = (data: BookingData): ValidationResult => {
  const errors: string[] = [];

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.emailId || !emailRegex.test(data.emailId)) {
    errors.push('Please enter a valid email address');
  }

  // Phone validation (Indian phone numbers)
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanContactNumber = data.contactNumber ? data.contactNumber.replace(/\D/g, '') : '';
  if (!cleanContactNumber || !phoneRegex.test(cleanContactNumber)) {
    errors.push('Please enter a valid 10-digit phone number');
  }

  // WhatsApp validation (optional but if provided, must be valid)
  if (data.whatsAppNumber) {
    const cleanWhatsAppNumber = data.whatsAppNumber.replace(/\D/g, '');
    if (!phoneRegex.test(cleanWhatsAppNumber)) {
      errors.push('Please enter a valid WhatsApp number');
    }
  }

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  // Address validation
  if (data.pickup_address && data.pickup_address.trim().length < 10) {
    errors.push('Pickup address must be at least 10 characters long');
  }

  if (data.drop_address && data.drop_address.trim().length < 10) {
    errors.push('Drop address must be at least 10 characters long');
  }

  // Passenger count validation
  const passengerCount = parseInt(data.numberOfPassengers);
  if (isNaN(passengerCount) || passengerCount < 1 || passengerCount > 8) {
    errors.push('Number of passengers must be between 1 and 8');
  }

  // Date validation
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (data.pick_up_date < today) {
    errors.push('Pickup date cannot be in the past');
  }

  // Time validation
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!data.pick_up_time || !timeRegex.test(data.pick_up_time)) {
    errors.push('Please enter a valid pickup time (HH:MM format)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitizes user input to prevent XSS
 * @param input - Raw user input
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  if (input === null || input === undefined) return '';
  return String(input)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Validates and sanitizes complete booking data
 * @param data - Raw booking data
 * @returns Validated and sanitized booking data
 */
export const validateAndSanitizeBooking = (data: BookingData): ValidationResult & { sanitizedData: Partial<BookingData> } => {
  const sanitizedData: Partial<BookingData> = {
    emailId: sanitizeInput(data.emailId),
    contactNumber: sanitizeInput(data.contactNumber),
    whatsAppNumber: sanitizeInput(data.whatsAppNumber),
    name: sanitizeInput(data.name),
    pickup_address: data.pickup_address ? sanitizeInput(data.pickup_address) : undefined,
    drop_address: data.drop_address ? sanitizeInput(data.drop_address) : undefined,
    numberOfPassengers: sanitizeInput(data.numberOfPassengers),
    pick_up_date: data.pick_up_date,
    pick_up_time: sanitizeInput(data.pick_up_time)
  };

  const validation = validateBookingData(sanitizedData as BookingData);

  return {
    ...validation,
    sanitizedData
  };
};
