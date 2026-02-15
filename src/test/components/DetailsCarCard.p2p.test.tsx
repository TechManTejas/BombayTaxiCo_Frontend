import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DetailsCarCard from '../../components/DetailsCarCard';

// Mock the icon imports
vi.mock('../../icons/Disel.svg', () => ({ default: 'mock-diesel-icon' }));
vi.mock('../../icons/Air Conditioning.svg', () => ({ default: 'mock-ac-icon' }));
vi.mock('../../assets/images/car.png', () => ({ default: 'mock-car-image' }));

describe('DetailsCarCard - P2P Tests', () => {
  const mockProps = {
    category: 'Sedan',
    description: 'Comfortable sedan car',
    features: [
      { feature: 'Air Conditioning', icon: 'Air Conditioning' },
      { feature: 'Diesel', icon: 'Diesel' },
      { feature: 'Automatic Transmission', icon: 'Automatic Transmission' }
    ],
    originalPrice: '2000',
    discountedPrice: '1800',
    discount: '10'
  };

  it('should render car card with accessibility features', () => {
    render(<DetailsCarCard {...mockProps} />);
    
    // Check for sr-only text for screen readers
    expect(screen.getByText('Car')).toBeInTheDocument();
  });

  it('should handle empty features array gracefully', () => {
    const propsWithEmptyFeatures = { ...mockProps, features: [] };
    render(<DetailsCarCard {...propsWithEmptyFeatures} />);
    
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    // Should not crash when features is empty
  });

  it('should handle undefined features gracefully', () => {
    const propsWithUndefinedFeatures = { ...mockProps, features: undefined };
    render(<DetailsCarCard {...propsWithUndefinedFeatures} />);
    
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    // Should not crash when features is undefined
  });

  it('should display correct tax information based on preview mode', () => {
    const { rerender } = render(<DetailsCarCard {...mockProps} preview={false} />);
    expect(screen.getByText('Inclusive Of Toll & Sate Tax')).toBeInTheDocument();

    rerender(<DetailsCarCard {...mockProps} preview={true} />);
    expect(screen.queryByText('Inclusive Of Toll & Sate Tax')).not.toBeInTheDocument();
  });

  it('should handle long category names gracefully', () => {
    const propsWithLongCategory = {
      ...mockProps,
      category: 'Luxury Premium Sedan With Extra Features'
    };
    render(<DetailsCarCard {...propsWithLongCategory} />);
    
    expect(screen.getByText('Luxury Premium Sedan With Extra Features')).toBeInTheDocument();
  });

  it('should handle special characters in description', () => {
    const propsWithSpecialChars = {
      ...mockProps,
      description: 'Comfortable sedan car with AC & GPS! (Best in town)'
    };
    render(<DetailsCarCard {...propsWithSpecialChars} />);
    
    expect(screen.getByText('Comfortable sedan car with AC & GPS! (Best in town)')).toBeInTheDocument();
  });

  it('should handle missing icon in feature gracefully', () => {
    const propsWithMissingIcon = {
      ...mockProps,
      features: [
        { feature: 'Unknown Feature', icon: 'Unknown Icon' },
        { feature: 'Feature Without Icon' }
      ]
    };
    render(<DetailsCarCard {...propsWithMissingIcon} />);
    
    expect(screen.getByText('Unknown Feature')).toBeInTheDocument();
    expect(screen.getByText('Feature Without Icon')).toBeInTheDocument();
    // Should not crash when icon is missing
  });

  it('should handle responsive layout correctly', () => {
    render(<DetailsCarCard {...mockProps} />);
    
    const card = screen.getByText('Sedan').closest('.bg-white');
    expect(card).toHaveClass('bg-white', 'rounded-t-lg');
  });

  it('should render book now button when not in preview mode', () => {
    render(<DetailsCarCard {...mockProps} preview={false} />);
    
    expect(screen.getByText('BOOK NOW')).toBeInTheDocument();
  });

  it('should not render book now button in preview mode', () => {
    render(<DetailsCarCard {...mockProps} preview={true} />);
    
    expect(screen.queryByText('BOOK NOW')).not.toBeInTheDocument();
  });
});
