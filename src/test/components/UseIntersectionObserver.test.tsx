import { renderHook } from '@testing-library/react'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { useIntersectionObserver } from '../../components/UseIntersectionObserver'

describe('useIntersectionObserver Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('returns isVisible and elementRef', () => {
    const { result } = renderHook(() => useIntersectionObserver({}))
    expect(result.current).toHaveLength(2)
    expect(result.current[0]).toBe(false)
    expect(result.current[1]).toBeDefined()
  })

  test('initializes with isVisible as false', () => {
    const { result } = renderHook(() => useIntersectionObserver({}))
    expect(result.current[0]).toBe(false)
  })

  test('returns ref object', () => {
    const { result } = renderHook(() => useIntersectionObserver({}))
    const ref = result.current[1]
    expect(ref).toHaveProperty('current')
    expect(ref.current).toBeNull()
  })

  test('accepts IntersectionObserver options', () => {
    const options = { threshold: 0.5, rootMargin: '10px' }
    const { result } = renderHook(() => useIntersectionObserver(options))
    expect(result.current).toBeDefined()
  })

  test('handles empty options object', () => {
    const { result } = renderHook(() => useIntersectionObserver({}))
    expect(result.current[0]).toBe(false)
    expect(result.current[1]).toBeDefined()
  })

  test('ref can be attached to element', () => {
    const { result } = renderHook(() => useIntersectionObserver({}))
    const ref = result.current[1]
    const div = document.createElement('div')
    ref.current = div
    expect(ref.current).toBe(div)
  })
})

