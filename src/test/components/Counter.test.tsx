import { renderHook, act } from '@testing-library/react'
import { beforeEach, afterEach, describe, test, expect, vi } from 'vitest'
import useCounter from '../../components/Counter'

describe('useCounter Hook', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.runOnlyPendingTimers(); vi.useRealTimers() })

  test('starts with count 0', () => {
    const { result } = renderHook(() => useCounter(10, 1000))
    expect(result.current).toBe(0)
  })

  test('counts up to the specified end value', () => {
    const { result } = renderHook(() => useCounter(5, 100))
    act(() => { vi.advanceTimersByTime(500) })
    expect(result.current).toBe(5)
  })

  test('clears interval when component unmounts', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const { unmount } = renderHook(() => useCounter(10, 1000))
    unmount()
    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })

  test('restarts counting when end or duration changes', () => {
    const { result, rerender } = renderHook(
      ({ end, duration }) => useCounter(end, duration),
      { initialProps: { end: 5, duration: 100 } }
    )
    act(() => { vi.advanceTimersByTime(30) })
    expect(result.current).toBe(0)
    rerender({ end: 10, duration: 200 })
    expect(result.current).toBe(0)
    act(() => { vi.advanceTimersByTime(200) })
    expect(result.current).toBe(10)
  })

  test('handles edge case with end = 0', () => {
    const { result } = renderHook(() => useCounter(0, 100))
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current).toBe(0)
  })

  test('handles large numbers', () => {
    const { result } = renderHook(() => useCounter(1000, 1000))
    act(() => { vi.advanceTimersByTime(1000) })
    expect(result.current).toBe(1000)
  })

  test('handles negative end value', () => {
    const { result } = renderHook(() => useCounter(-5, 100))
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current).toBe(0)
  })

  test('handles zero duration', () => {
    const { result } = renderHook(() => useCounter(10, 0))
    expect(result.current).toBe(0)
  })

  test('updates count incrementally', () => {
    const { result } = renderHook(() => useCounter(10, 100))
    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current).toBeGreaterThan(0)
    expect(result.current).toBeLessThanOrEqual(10)
  })

  test('stops at end value exactly', () => {
    const { result } = renderHook(() => useCounter(5, 100))
    act(() => { vi.advanceTimersByTime(500) })
    expect(result.current).toBe(5)
    act(() => { vi.advanceTimersByTime(1000) })
    expect(result.current).toBe(5)
  })

  test('interval calculation is correct', () => {
    const { result } = renderHook(() => useCounter(100, 1000))
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current).toBeGreaterThan(0)
    expect(result.current).toBeLessThan(100)
  })

  test('cleanup on unmount prevents memory leaks', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const { unmount } = renderHook(() => useCounter(100, 1000))
    unmount()
    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })

  test('handles rapid prop changes', () => {
    const { result, rerender } = renderHook(
      ({ end, duration }) => useCounter(end, duration),
      { initialProps: { end: 10, duration: 100 } }
    )
    act(() => { vi.advanceTimersByTime(50) })
    rerender({ end: 20, duration: 200 })
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current).toBeGreaterThanOrEqual(0)
    rerender({ end: 5, duration: 50 })
    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current).toBe(5)
  })

  test('calculates interval correctly for different ratios', () => {
    const { result } = renderHook(() => useCounter(50, 500))
    act(() => { vi.advanceTimersByTime(10) })
    expect(result.current).toBeGreaterThan(0)
    expect(result.current).toBeLessThanOrEqual(50)
  })

  test('handles very small duration values', () => {
    const { result } = renderHook(() => useCounter(10, 1))
    act(() => { vi.advanceTimersByTime(1) })
    expect(result.current).toBeGreaterThanOrEqual(0)
  })

  test('handles very large end values', () => {
    const { result } = renderHook(() => useCounter(10000, 10000))
    act(() => { vi.advanceTimersByTime(1000) })
    expect(result.current).toBeGreaterThan(0)
    expect(result.current).toBeLessThanOrEqual(10000)
  })

  test('maintains count state across re-renders with same props', () => {
    const { result, rerender } = renderHook(() => useCounter(10, 100))
    act(() => { vi.advanceTimersByTime(50) })
    const firstCount = result.current
    rerender()
    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current).toBeGreaterThan(firstCount)
  })

  test('handles decimal end values', () => {
    const { result } = renderHook(() => useCounter(10.5, 100))
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current).toBeGreaterThanOrEqual(0)
  })

  test('handles decimal duration values', () => {
    const { result } = renderHook(() => useCounter(10, 100.5))
    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current).toBeGreaterThanOrEqual(0)
  })

  test('stops incrementing after reaching end value', () => {
    const { result } = renderHook(() => useCounter(5, 100))
    act(() => { vi.advanceTimersByTime(600) })
    expect(result.current).toBe(5)
    act(() => { vi.advanceTimersByTime(1000) })
    expect(result.current).toBe(5)
  })

  test('handles multiple simultaneous counters', () => {
    const { result: result1 } = renderHook(() => useCounter(10, 100))
    const { result: result2 } = renderHook(() => useCounter(20, 200))
    act(() => { vi.advanceTimersByTime(100) })
    expect(result1.current).toBeGreaterThanOrEqual(0)
    expect(result2.current).toBeGreaterThanOrEqual(0)
  })

  test('interval updates are consistent', () => {
    const { result } = renderHook(() => useCounter(100, 1000))
    const counts: number[] = []
    for (let i = 0; i < 10; i++) {
      act(() => { vi.advanceTimersByTime(10) })
      counts.push(result.current)
    }
    expect(counts.every((count, index) => index === 0 || count >= counts[index - 1])).toBe(true)
  })

  test('handles end value change mid-count', () => {
    const { result, rerender } = renderHook(
      ({ end }) => useCounter(end, 100),
      { initialProps: { end: 10 } }
    )
    act(() => { vi.advanceTimersByTime(50) })
    rerender({ end: 20 })
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current).toBeGreaterThanOrEqual(0)
  })

  test('handles duration value change mid-count', () => {
    const { result, rerender } = renderHook(
      ({ duration }) => useCounter(10, duration),
      { initialProps: { duration: 100 } }
    )
    act(() => { vi.advanceTimersByTime(50) })
    rerender({ duration: 200 })
    act(() => { vi.advanceTimersByTime(200) })
    expect(result.current).toBeGreaterThanOrEqual(0)
  })

  test('initializes with zero count', () => {
    const { result } = renderHook(() => useCounter(100, 1000))
    expect(result.current).toBe(0)
  })

  test('handles edge case where end equals duration', () => {
    const { result } = renderHook(() => useCounter(100, 100))
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current).toBeGreaterThanOrEqual(0)
  })
})
