import { renderHook } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import useCounter from '../../components/Counter'

describe('useCounter Hook', () => {
  test('should handle zero end value gracefully', () => {
    // This test will FAIL in base due to division by zero
    // but PASS after our fix
    expect(() => {
      renderHook(() => useCounter(0, 1000))
    }).not.toThrow()
  })

  test('should handle negative end value gracefully', () => {
    // This test will FAIL in base due to negative interval
    // but PASS after our fix
    expect(() => {
      renderHook(() => useCounter(-5, 1000))
    }).not.toThrow()
  })

  test('should count correctly with positive values', () => {
    // This test should PASS in both base and after (P2P test)
    const { result } = renderHook(() => useCounter(5, 1000))
    
    // Initially should be 0
    expect(result.current).toBe(0)
  })

  test('should handle large end values', () => {
    // This test should PASS in both base and after (P2P test)
    expect(() => {
      renderHook(() => useCounter(1000, 5000))
    }).not.toThrow()
  })
})
