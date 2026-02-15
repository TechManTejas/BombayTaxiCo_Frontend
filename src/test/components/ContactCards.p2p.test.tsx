import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactCards } from '../../components/ContactCards';

describe('ContactCards', () => {
  it('should render contact card with office address', () => {
    render(<ContactCards />);
    
    expect(screen.getByText('Office Address')).toBeInTheDocument();
    expect(screen.getByText('25/B Milford, New York, USA')).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    render(<ContactCards />);
    
    const card = screen.getByText('Office Address').closest('.bg-white');
    expect(card).toHaveClass('bg-white', 'rounded-3xl', 'm-8');
  });

  it('should display the yellow accent circle', () => {
    render(<ContactCards />);
    
    const accentCircle = document.querySelector('.bg-\\[\\#FDB813\\].rounded-full');
    expect(accentCircle).toBeInTheDocument();
  });

  it('should have border styling', () => {
    render(<ContactCards />);
    
    const borderElement = document.querySelector('.border-t-\\[3px\\].border-r-\\[3px\\].border-yellow-500');
    expect(borderElement).toBeInTheDocument();
  });

  it('should have proper dimensions', () => {
    render(<ContactCards />);
    
    const card = screen.getByText('Office Address').closest('.w-\\[272px\\].h-\\[232px\\]');
    expect(card).toBeInTheDocument();
  });
});
