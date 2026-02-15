import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookingConfirmed } from '../../components/BookingConfirmed';
import { MemoryRouter } from 'react-router-dom';

// Mock the localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

describe('BookingConfirmed', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    render(
      <MemoryRouter>
        <BookingConfirmed />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Loading booking details...')).toBeInTheDocument();
  });

  it('should render booking confirmation with details from location state', async () => {
    const mockBooking = {
      booking_number: '12345',
      customer_name: 'John Doe'
    };

    render(
      <MemoryRouter initialEntries={[{ state: { booking: mockBooking } }]}>
        <BookingConfirmed />
      </MemoryRouter>
    );
    
    // Wait for loading to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(screen.getByText('YOUR BOOKING IS')).toBeInTheDocument();
    expect(screen.getByText('CONFIRMED!')).toBeInTheDocument();
    expect(screen.getByText('Booking #12345 - Thank You For Booking With Us')).toBeInTheDocument();
  });

  it('should load booking from localStorage when no location state', () => {
    const mockBooking = {
      booking_number: '67890',
      customer_name: 'Jane Smith'
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockBooking));

    render(
      <MemoryRouter>
        <BookingConfirmed />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Booking #67890 - Thank You For Booking With Us')).toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('lastBooking', JSON.stringify(mockBooking));
  });

  it('should handle missing booking gracefully', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <MemoryRouter>
        <BookingConfirmed />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Booking #N/A - Thank You For Booking With Us')).toBeInTheDocument();
  });

  it('should display contact information', () => {
    render(
      <MemoryRouter>
        <BookingConfirmed />
      </MemoryRouter>
    );
    
    expect(screen.getByText('You Will Soon Receive An E-mail Confirmation')).toBeInTheDocument();
    expect(screen.getByText('If you need to change or cancel booking please contact us at')).toBeInTheDocument();
    expect(screen.getByText('Support Team,')).toBeInTheDocument();
    expect(screen.getByText('+91 6262 744 744')).toBeInTheDocument();
    expect(screen.getByText('Bombay Taxi Company')).toBeInTheDocument();
  });
});
