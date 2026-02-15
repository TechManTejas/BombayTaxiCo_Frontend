import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CallUsSticky from '../../components/CallUsSticky';

describe('CallUsSticky', () => {
  it('should render the sticky call component', () => {
    render(<CallUsSticky />);
    
    expect(screen.getByText('+91 6262-744-744')).toBeInTheDocument();
  });

  it('should display CALL US text as individual characters', () => {
    render(<CallUsSticky />);
    
    // Should display the CALL US text characters
    expect(screen.getAllByText('L')).toHaveLength(2);
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('U')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('should have call button functionality', () => {
    render(<CallUsSticky />);
    
    const callButton = screen.getByText('+91 6262-744-744');
    expect(callButton.closest('button')).toBeInTheDocument();
  });

  it('should be hidden on large screens', () => {
    render(<CallUsSticky />);
    
    const container = screen.getByText('+91 6262-744-744').closest('.lg\\:hidden');
    expect(container).toBeInTheDocument();
  });

  it('should be fixed positioned on mobile', () => {
    render(<CallUsSticky />);
    
    const container = screen.getByText('+91 6262-744-744').closest('.fixed');
    expect(container).toBeInTheDocument();
  });
});
