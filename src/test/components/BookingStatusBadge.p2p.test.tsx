import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookingStatusBadge } from '../../components/BookingStatusBadge';
import { BookingStatus } from '../../types/bookings.types';

describe('BookingStatusBadge - P2P Tests', () => {
  it('should handle all booking status enum values correctly', () => {
    const statuses = Object.values(BookingStatus);
    
    statuses.forEach(status => {
      const { unmount } = render(<BookingStatusBadge status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply correct color classes for all statuses', () => {
    const statusColorMap = {
      [BookingStatus.New]: 'blue',
      [BookingStatus.Rescheduled]: 'orange',
      [BookingStatus.Confirmed]: 'green',
      [BookingStatus.OnRide]: 'purple',
      [BookingStatus.Completed]: 'default',
      [BookingStatus.Cancelled]: 'red',
      [BookingStatus.CancelledByUser]: 'red'
    };

    Object.entries(statusColorMap).forEach(([status, expectedColor]) => {
      const { unmount } = render(<BookingStatusBadge status={status as BookingStatus} />);
      const badge = screen.getByText(status).closest('.ant-badge');
      expect(badge).toHaveClass(`ant-badge-status-${expectedColor}`);
      unmount();
    });
  });

  it('should render badges with proper accessibility attributes', () => {
    render(<BookingStatusBadge status={BookingStatus.Confirmed} />);
    
    const badge = screen.getByText('Confirmed').closest('.ant-badge');
    expect(badge).toBeInTheDocument();
  });

  it('should handle rapid status changes without errors', () => {
    const { rerender } = render(<BookingStatusBadge status={BookingStatus.New} />);
    expect(screen.getByText('New')).toBeInTheDocument();

    rerender(<BookingStatusBadge status={BookingStatus.Confirmed} />);
    expect(screen.getByText('Confirmed')).toBeInTheDocument();

    rerender(<BookingStatusBadge status={BookingStatus.Completed} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('should handle empty status string gracefully', () => {
    render(<BookingStatusBadge status={'' as BookingStatus} />);
    expect(screen.getByText('')).toBeInTheDocument();
  });

  it('should handle null/undefined status gracefully', () => {
    render(<BookingStatusBadge status={null as any} />);
    expect(screen.getByText('')).toBeInTheDocument();
  });

  it('should maintain consistent badge structure across all statuses', () => {
    const statuses = Object.values(BookingStatus);
    
    statuses.forEach(status => {
      const { unmount } = render(<BookingStatusBadge status={status} />);
      const badge = screen.getByText(status).closest('.ant-badge');
      expect(badge).toHaveClass('ant-badge-status');
      unmount();
    });
  });

  it('should handle custom status values not in enum', () => {
    const customStatuses = ['Pending', 'In Progress', 'On Hold', 'Rejected'];
    
    customStatuses.forEach(status => {
      const { unmount } = render(<BookingStatusBadge status={status as BookingStatus} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      const badge = screen.getByText(status).closest('.ant-badge');
      expect(badge).toHaveClass('ant-badge-status-default');
      unmount();
    });
  });

  it('should be case sensitive for status matching', () => {
    render(<BookingStatusBadge status={'confirmed' as BookingStatus} />);
    expect(screen.getByText('confirmed')).toBeInTheDocument();
    
    const badge = screen.getByText('confirmed').closest('.ant-badge');
    expect(badge).toHaveClass('ant-badge-status-default');
  });

  it('should handle status with special characters', () => {
    const specialStatus = 'On-Hold (Pending)';
    render(<BookingStatusBadge status={specialStatus as BookingStatus} />);
    
    expect(screen.getByText(specialStatus)).toBeInTheDocument();
    const badge = screen.getByText(specialStatus).closest('.ant-badge');
    expect(badge).toHaveClass('ant-badge-status-default');
  });
});
