import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CarCard from '../../components/CarCard';

// Mock the icon imports
vi.mock('../../icons/Disel.svg', () => ({ default: 'mock-diesel-icon' }));
vi.mock('../../icons/Air Conditioning.svg', () => ({ default: 'mock-ac-icon' }));
vi.mock('../../assets/images/car.png', () => ({ default: 'mock-car-image' }));

describe('CarCard', () => {
  const mockProps = {
    category: 'Sedan',
    description: 'Comfortable sedan car',
    features: [
      { feature: 'Air Conditioning', icon: 'Air Conditioning' },
      { feature: 'Diesel', icon: 'Diesel' }, // This should fail due to typo mismatch
      { feature: 'Automatic Transmission', icon: 'Automatic Transmission' }
    ],
    originalPrice: '2000',
    discountedPrice: '1800',
    discount: '10'
  };

  it('should render car card with basic information', () => {
    render(<CarCard {...mockProps} />);
    
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('Comfortable sedan car')).toBeInTheDocument();
  });

  it('should display features correctly', () => {
    render(<CarCard {...mockProps} />);
    
    expect(screen.getByText('Air Conditioning')).toBeInTheDocument();
    expect(screen.getByText('Automatic Transmission')).toBeInTheDocument();
  });

  it('should display diesel feature icon when icon key matches', () => {
    render(<CarCard {...mockProps} />);
    
    // This test will fail initially because "Diesel" in features doesn't match "Disel" in import
    // but the icon lookup uses feature.feature which is "Diesel", while the map has "Diesel" -> "Disel"
    const dieselIcon = document.querySelector('img[src="mock-diesel-icon"]');
    expect(dieselIcon).toBeInTheDocument(); // This should fail initially
  });

  it('should display discount when discount is greater than 0', () => {
    render(<CarCard {...mockProps} />);
    
    expect(screen.getByText('₹ 2000')).toBeInTheDocument();
    expect(screen.getByText('₹ 1800')).toBeInTheDocument();
  });

  it('should not display discount when discount is 0', () => {
    const propsWithoutDiscount = { ...mockProps, discount: '0' };
    render(<CarCard {...propsWithoutDiscount} />);
    
    expect(screen.queryByText('₹ 2000')).not.toBeInTheDocument();
    expect(screen.getByText('₹ 1800')).toBeInTheDocument();
  });

  it('should handle missing carImage gracefully', () => {
    render(<CarCard {...mockProps} carImage="undefined" />);
    
    const carImage = document.querySelector('img[src="mock-car-image"]');
    expect(carImage).toBeInTheDocument();
  });

  it('should call onBook when clicked on mobile', () => {
    const mockOnBook = vi.fn();
    // Mock window.innerWidth for mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768
    });

    render(<CarCard {...mockProps} onBook={mockOnBook} />);
    
    const card = screen.getByText('Sedan').closest('.bg-white') as HTMLElement;
    card?.click();
    
    expect(mockOnBook).toHaveBeenCalled();
  });

  it('should not call onBook when clicked on desktop', () => {
    const mockOnBook = vi.fn();
    // Mock window.innerWidth for desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });

    render(<CarCard {...mockProps} onBook={mockOnBook} />);
    
    const card = screen.getByText('Sedan').closest('.bg-white') as HTMLElement;
    card?.click();
    
    expect(mockOnBook).not.toHaveBeenCalled();
  });

  it('should show book now button when not in preview mode', () => {
    render(<CarCard {...mockProps} />);
    
    expect(screen.getByText('BOOK NOW')).toBeInTheDocument();
  });

  it('should not show book now button in preview mode', () => {
    render(<CarCard {...mockProps} preview={true} />);
    
    expect(screen.queryByText('BOOK NOW')).not.toBeInTheDocument();
  });
});
