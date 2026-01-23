import dayjs from 'dayjs'
import { describe, test, expect } from 'vitest'
import { generateTimeOptions, generateTimeOptionsAll } from '../../utils/GenerateTimeOptions'

describe('generateTimeOptions', () => {
  test('generateTimeOptions returns time options for future date', () => {
    const futureDate = dayjs().add(1, 'day')
    const options = generateTimeOptions(futureDate)

    expect(options.length).toBe(96) // 24 hours * 4 (15-minute intervals)
    expect(options[0]).toEqual({
      label: '12:00 AM',
      key: '12:00 AM'
    })
  })

  test('generateTimeOptions filters past times for today', () => {
    const today = dayjs()
    const options = generateTimeOptions(today)

    // Should have fewer options than 96 due to filtering past times
    expect(options.length).toBeLessThan(96)
    expect(options.length).toBeGreaterThan(0)
  })

  test('generateTimeOptionsAll returns all time options regardless of date', () => {
    const today = dayjs()
    const options = generateTimeOptionsAll(today)

    expect(options.length).toBe(96)
    expect(options[0]).toEqual({
      label: '12:00 AM',
      key: '12:00 AM'
    })
    expect(options[95]).toEqual({
      label: '11:45 PM',
      key: '11:45 PM'
    })
  })

  test('time options are formatted correctly', () => {
    const futureDate = dayjs().add(1, 'day')
    const options = generateTimeOptions(futureDate)

    // Check some specific time formats
    const noonOption = options.find(opt => opt.label.includes('12:00 PM'))
    const midnightOption = options.find(opt => opt.label.includes('12:00 AM'))

    expect(noonOption).toBeDefined()
    expect(midnightOption).toBeDefined()
  })

  test('returns objects with label and key properties', () => {
    const futureDate = dayjs().add(1, 'day')
    const options = generateTimeOptions(futureDate)

    options.forEach(option => {
      expect(option).toHaveProperty('label')
      expect(option).toHaveProperty('key')
      expect(option.label).toBe(option.key)
      expect(typeof option.label).toBe('string')
    })
  })
})

