import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminNavbar from '../../admin/components/Navbar';

describe('AdminNavbar', () => {
  it('should render admin navbar with logo', () => {
    render(<AdminNavbar />);
    
    const logo = screen.getByAltText('Bombay Taxi Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('decoding', 'async');
  });

  it('should display ADMIN text on medium screens and up', () => {
    render(<AdminNavbar />);
    
    expect(screen.getByText('ADMIN')).toBeInTheDocument();
    const adminText = screen.getByText('ADMIN').closest('.hidden.md\\:block');
    expect(adminText).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    render(<AdminNavbar />);
    
    const navbar = screen.getByAltText('Bombay Taxi Logo').closest('.bg-zinc-200');
    expect(navbar).toBeInTheDocument();
    
    const container = navbar?.querySelector('.container.mx-auto');
    expect(container).toBeInTheDocument();
    
    const nav = container?.querySelector('.rounded-xl.drop-shadow');
    expect(nav).toBeInTheDocument();
  });

  it('should have responsive logo container', () => {
    render(<AdminNavbar />);
    
    const logoContainer = screen.getByAltText('Bombay Taxi Logo').closest('.w-52.md\\:w-72');
    expect(logoContainer).toBeInTheDocument();
  });
});
