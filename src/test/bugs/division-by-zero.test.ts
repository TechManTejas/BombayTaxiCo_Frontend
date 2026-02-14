import { renderHook } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import useCounter from '../../components/Counter'

describe('Division by Zero Bug Fixes', () => {
  test('should handle zero end value without crashing', () => {
    // F2P Test: FAILS in base (division by zero), PASSES after fix
    expect(() => {
      renderHook(() => useCounter(0, 1000))
    }).not.toThrow()
  })

  test('should handle negative end value gracefully', () => {
    // F2P Test: FAILS in base (negative interval), PASSES after fix
    expect(() => {
      renderHook(() => useCounter(-5, 1000))
    }).not.toThrow()
  })

  test('should work normally with valid values', () => {
    // P2P Test: PASSES in both base and after
    const { result } = renderHook(() => useCounter(5, 1000))
    expect(result.current).toBe(0)
  })
})
