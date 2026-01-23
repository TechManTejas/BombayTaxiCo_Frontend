import { describe, test, expect } from 'vitest'
import axios from '../../api/axios'

describe('Axios Configuration', () => {
  test('axios instance is configured', () => {
    expect(axios).toBeDefined()
    expect(typeof axios.get).toBe('function')
    expect(typeof axios.post).toBe('function')
  })
})

