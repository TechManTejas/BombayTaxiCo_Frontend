import { describe, test, expect } from 'vitest'
import { generateDistanceOptions } from '../../utils/GenerateDistanceOptions'

describe('generateDistanceOptions', () => {
  test('generates distance options correctly', () => {
    const options = generateDistanceOptions()

    expect(options).toHaveLength(3) // 8, 10, 12 hours

    expect(options[0]).toEqual({
      label: '8 hr 80 kms',
      key: '8 hr 80 kms'
    })

    expect(options[1]).toEqual({
      label: '10 hr 100 kms',
      key: '10 hr 100 kms'
    })

    expect(options[2]).toEqual({
      label: '12 hr 120 kms',
      key: '12 hr 120 kms'
    })
  })

  test('returns array of objects with label and key properties', () => {
    const options = generateDistanceOptions()

    options.forEach(option => {
      expect(option).toHaveProperty('label')
      expect(option).toHaveProperty('key')
      expect(typeof option.label).toBe('string')
      expect(typeof option.key).toBe('string')
    })
  })
})

