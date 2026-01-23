import { renderHook, act } from '@testing-library/react'
import { beforeEach, afterEach, describe, test, expect, vi } from 'vitest'
import useCounter from '../../components/Counter'

describe('useCounter Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  test('starts with count 0', () => {
    const { result } = renderHook(() => useCounter(10, 1000))

    expect(result.current).toBe(0)
  })

  test('counts up to the specified end value', () => {
    const { result } = renderHook(() => useCounter(5, 100))

    // Fast-forward time to complete the count
    act(() => {
      vi.advanceTimersByTime(500)
    })

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

    // Advance time partially
    act(() => {
      vi.advanceTimersByTime(30)
    })

    expect(result.current).toBe(0) // Still 0

    // Change props
    rerender({ end: 10, duration: 200 })

    // Should reset to 0
    expect(result.current).toBe(0)

    // Advance time to complete new count
    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current).toBe(10)
  })

  test('handles edge case with end = 0', () => {
    const { result } = renderHook(() => useCounter(0, 100))

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe(0)
  })

  test('handles large numbers', () => {
    const { result } = renderHook(() => useCounter(1000, 1000))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current).toBe(1000)
  })
})

