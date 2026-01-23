import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { confirmation } from '../../components/Confirmation'

describe('confirmation utility', () => {
  beforeEach(() => {
    // Clear any existing modals
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('returns a promise', () => {
    const result = confirmation('Test message')
    expect(result).toBeInstanceOf(Promise)
  })

  test('confirmation function exists', () => {
    expect(typeof confirmation).toBe('function')
  })
})

