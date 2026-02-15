import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BillCard from '../../components/BillCard';

describe('BillCard', () => {
  it('should render bill card with default props', () => {
    render(<BillCard amount={1000} />);
    
    expect(screen.getByText('₹1,000')).toBeInTheDocument();
    expect(screen.getByText('Bill Payment')).toBeInTheDocument();
    expect(screen.getByText('PENDING')).toBeInTheDocument();
  });

  it('should render with custom props', () => {
    render(
      <BillCard 
        amount={2500} 
        currency="$" 
        description="Taxi Fare" 
        date="2024-01-15"
        status="paid"
      />
    );
    
    expect(screen.getByText('$2,500')).toBeInTheDocument();
    expect(screen.getByText('Taxi Fare')).toBeInTheDocument();
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('PAID')).toBeInTheDocument();
  });

  it('should apply correct status colors', () => {
    const { rerender } = render(<BillCard amount={100} status="paid" />);
    expect(screen.getByText('PAID')).toHaveClass('text-green-600');

    rerender(<BillCard amount={100} status="overdue" />);
    expect(screen.getByText('OVERDUE')).toHaveClass('text-red-600');

    rerender(<BillCard amount={100} status="pending" />);
    expect(screen.getByText('PENDING')).toHaveClass('text-yellow-600');
  });

  it('should format amount correctly', () => {
    render(<BillCard amount={1234567} />);
    
    expect(screen.getByText('₹1,234,567')).toBeInTheDocument();
  });
});
