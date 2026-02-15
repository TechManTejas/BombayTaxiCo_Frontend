import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookingStatusBadge } from '../../components/BookingStatusBadge';
import { BookingStatus } from '../../types/bookings.types';

describe('BookingStatusBadge', () => {
  it('should render badge for New status', () => {
    render(<BookingStatusBadge status={BookingStatus.New} />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should render badge for Confirmed status', () => {
    render(<BookingStatusBadge status={BookingStatus.Confirmed} />);
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
  });

  it('should render badge for Completed status', () => {
    render(<BookingStatusBadge status={BookingStatus.Completed} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('should render badge for Cancelled status', () => {
    render(<BookingStatusBadge status={BookingStatus.Cancelled} />);
    expect(screen.getByText('Cancelled')).toBeInTheDocument();
  });

  it('should render badge for CancelledByUser status', () => {
    render(<BookingStatusBadge status={BookingStatus.CancelledByUser} />);
    expect(screen.getByText('CancelledByUser')).toBeInTheDocument();
  });

  it('should render badge for Rescheduled status', () => {
    render(<BookingStatusBadge status={BookingStatus.Rescheduled} />);
    expect(screen.getByText('Rescheduled')).toBeInTheDocument();
  });

  it('should render badge for OnRide status', () => {
    render(<BookingStatusBadge status={BookingStatus.OnRide} />);
    
    // This test will pass now that we fixed the enum value
    expect(screen.getByText('OnRide')).toBeInTheDocument();
  });

  it('should handle unknown status gracefully', () => {
    render(<BookingStatusBadge status={'Unknown' as BookingStatus} />);
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
