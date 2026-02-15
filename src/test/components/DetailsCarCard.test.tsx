import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DetailsCarCard from '../../components/DetailsCarCard';

// Mock the icon imports
vi.mock('../../icons/Disel.svg', () => ({ default: 'mock-diesel-icon' }));
vi.mock('../../icons/Air Conditioning.svg', () => ({ default: 'mock-ac-icon' }));
vi.mock('../../assets/images/car.png', () => ({ default: 'mock-car-image' }));

describe('DetailsCarCard', () => {
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
    render(<DetailsCarCard {...mockProps} />);
    
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('Comfortable sedan car')).toBeInTheDocument();
    expect(screen.getByText('Car')).toBeInTheDocument(); // sr-only text
  });

  it('should display features correctly', () => {
    render(<DetailsCarCard {...mockProps} />);
    
    expect(screen.getByText('Air Conditioning')).toBeInTheDocument();
    expect(screen.getByText('Automatic Transmission')).toBeInTheDocument();
  });

  it('should display diesel feature icon when icon key matches', () => {
    render(<DetailsCarCard {...mockProps} />);
    
    // This test will fail initially because "Diesel" in features doesn't match "Disel" in import
    // but the icon lookup uses feature.icon which is "Diesel", while the map has "Diesel" -> "Disel"
    const dieselIcon = document.querySelector('img[src="mock-diesel-icon"]');
    expect(dieselIcon).toBeInTheDocument(); // This should fail initially
  });

  it('should handle missing carImage gracefully', () => {
    render(<DetailsCarCard {...mockProps} carImage="undefined" />);
    
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

    render(<DetailsCarCard {...mockProps} onBook={mockOnBook} />);
    
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

    render(<DetailsCarCard {...mockProps} onBook={mockOnBook} />);
    
    const card = screen.getByText('Sedan').closest('.bg-white') as HTMLElement;
    card?.click();
    
    expect(mockOnBook).not.toHaveBeenCalled();
  });
});
