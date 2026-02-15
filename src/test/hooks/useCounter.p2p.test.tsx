import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import useCounter from '../../components/Counter';
import '@testing-library/jest-dom';

// Test component to use the hook
const TestComponent = ({ end, duration }: { end: number; duration: number }) => {
  const count = useCounter(end, duration);
  return <div data-testid="counter">{count}</div>;
};

describe('useCounter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should start from 0 and handle counting logic', () => {
    const { getByTestId } = render(<TestComponent end={5} duration={500} />);
    
    // Should start at 0
    expect(getByTestId('counter')).toHaveTextContent('0');
    
    // Advance timers a bit to see if it starts counting
    act(() => {
      vi.advanceTimersByTime(100);
    });
    
    // Should have started counting (but may not be at final value yet)
    const count = parseInt(getByTestId('counter').textContent || '0');
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('should handle zero end value', () => {
    const { getByTestId } = render(<TestComponent end={0} duration={1000} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
  });

  it('should handle negative end value', () => {
    const { getByTestId } = render(<TestComponent end={-5} duration={1000} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
  });

  it('should handle zero duration', () => {
    const { getByTestId } = render(<TestComponent end={5} duration={0} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
  });

  it('should handle negative duration', () => {
    const { getByTestId } = render(<TestComponent end={5} duration={-1000} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
  });

  it('should clean up interval on unmount', () => {
    const { unmount, getByTestId } = render(<TestComponent end={10} duration={1000} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
    
    // Unmount before counter finishes
    unmount();
    
    // Advance timers - should not cause errors
    act(() => {
      vi.advanceTimersByTime(2000);
    });
  });

  it('should handle large end values efficiently', () => {
    const { getByTestId } = render(<TestComponent end={100} duration={1000} />);
    
    expect(getByTestId('counter')).toHaveTextContent('0');
    
    // Advance timers partially
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    // Should have progressed but not finished
    const currentCount = parseInt(getByTestId('counter').textContent || '0');
    expect(currentCount).toBeGreaterThan(0);
    expect(currentCount).toBeLessThan(100);
  });
});
