import { describe, test, expect, vi } from 'vitest'
import { debounce, throttle, memoize, measurePerformance } from '../../utils/performanceHelpers'

describe('debounce', () => {
  test('calls function after delay', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 50)
    debounced()
    expect(fn).not.toHaveBeenCalled()
    await new Promise(r => setTimeout(r, 80))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('only calls once for rapid calls', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 50)
    debounced()
    debounced()
    debounced()
    await new Promise(r => setTimeout(r, 80))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should handle negative delay without crashing', () => {
    const fn = vi.fn()
    expect(() => debounce(fn, -100)).not.toThrow()
    const debounced = debounce(fn, -100)
    expect(() => debounced()).not.toThrow()
  })

  test('should handle NaN delay without crashing', () => {
    const fn = vi.fn()
    expect(() => debounce(fn, NaN)).not.toThrow()
  })

  test('passes arguments to the function', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 50)
    debounced('hello', 42)
    await new Promise(r => setTimeout(r, 80))
    expect(fn).toHaveBeenCalledWith('hello', 42)
  })
})

describe('throttle', () => {
  test('calls function immediately on first call', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('blocks subsequent calls within limit', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)
    throttled()
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('allows call after limit expires', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 50)
    throttled()
    await new Promise(r => setTimeout(r, 80))
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe('memoize', () => {
  test('caches results for same arguments', () => {
    let callCount = 0
    const expensive = (n: number) => { callCount++; return n * 2 }
    const memoized = memoize(expensive)
    expect(memoized(5)).toBe(10)
    expect(memoized(5)).toBe(10)
    expect(callCount).toBe(1)
  })

  test('computes for different arguments', () => {
    let callCount = 0
    const expensive = (n: number) => { callCount++; return n * 2 }
    const memoized = memoize(expensive)
    expect(memoized(5)).toBe(10)
    expect(memoized(3)).toBe(6)
    expect(callCount).toBe(2)
  })

  test('should not crash with circular reference arguments', () => {
    const fn = (obj: any) => obj.name || 'default'
    const memoized = memoize(fn)
    const circular: any = { name: 'test' }
    circular.self = circular
    expect(() => memoized(circular)).not.toThrow()
    expect(memoized(circular)).toBe('test')
  })

  test('handles string arguments', () => {
    const fn = (s: string) => s.toUpperCase()
    const memoized = memoize(fn)
    expect(memoized('hello')).toBe('HELLO')
    expect(memoized('hello')).toBe('HELLO')
  })
})

describe('measurePerformance', () => {
  test('returns result and time', () => {
    const add = (a: number, b: number) => a + b
    const { result, time } = measurePerformance(add, 2, 3)
    expect(result).toBe(5)
    expect(time).toBeGreaterThanOrEqual(0)
  })

  test('measures time for slow function', () => {
    const slow = () => {
      let sum = 0
      for (let i = 0; i < 100000; i++) sum += i
      return sum
    }
    const { result, time } = measurePerformance(slow)
    expect(result).toBeGreaterThan(0)
    expect(time).toBeGreaterThanOrEqual(0)
  })
})
