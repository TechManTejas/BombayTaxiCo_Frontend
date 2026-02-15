import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BillCard from '../../components/BillCard';

describe('BillCard P2P', () => {
  it('should handle edge case amounts', () => {
    render(<BillCard amount={0} />);
    expect(screen.getByText('₹0')).toBeInTheDocument();
  });

  it('should handle very large amounts', () => {
    render(<BillCard amount={999999999} />);
    expect(screen.getByText('₹999,999,999')).toBeInTheDocument();
  });

  it('should handle different currencies', () => {
    render(<BillCard amount={100} currency="$" />);
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('should handle custom descriptions', () => {
    render(<BillCard amount={100} description="Custom Bill" />);
    expect(screen.getByText('Custom Bill')).toBeInTheDocument();
  });

  it('should handle custom dates', () => {
    render(<BillCard amount={100} date="2024-01-01" />);
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  it('should handle all status types', () => {
    const { rerender } = render(<BillCard amount={100} status="paid" />);
    expect(screen.getByText('PAID')).toBeInTheDocument();

    rerender(<BillCard amount={100} status="pending" />);
    expect(screen.getByText('PENDING')).toBeInTheDocument();

    rerender(<BillCard amount={100} status="overdue" />);
    expect(screen.getByText('OVERDUE')).toBeInTheDocument();
  });
});
