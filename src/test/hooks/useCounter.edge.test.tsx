import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import useCounter from '../../components/Counter';
import '@testing-library/jest-dom';

// Test component to use the hook
const TestComponent = ({ end, duration }: { end: number; duration: number }) => {
  const count = useCounter(end, duration);
  return <div data-testid="counter">{count}</div>;
};

describe('useCounter Edge Cases', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should handle decimal duration values', () => {
    const { getByTestId } = render(<TestComponent end={5} duration={0.5} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
  });

  it('should handle very small duration values', () => {
    const { getByTestId } = render(<TestComponent end={1} duration={1} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
  });

  it('should handle zero end value with positive duration', () => {
    const { getByTestId } = render(<TestComponent end={0} duration={1000} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
  });

  it('should handle negative values gracefully', () => {
    const { getByTestId } = render(<TestComponent end={-10} duration={-100} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
  });

  it('should handle rapid unmount and remount', () => {
    const { unmount, rerender } = render(<TestComponent end={10} duration={1000} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
    
    unmount();
    
    const { getByTestId: getByTestId2 } = rerender(<TestComponent end={5} duration={500} />);
    expect(getByTestId2('counter')).toHaveTextContent('0');
  });
});
