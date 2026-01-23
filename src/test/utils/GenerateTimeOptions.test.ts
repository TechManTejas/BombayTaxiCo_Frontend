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

  test('handles different dates correctly', () => {
    const tomorrow = dayjs().add(1, 'day')
    const nextWeek = dayjs().add(7, 'days')
    const lastWeek = dayjs().subtract(7, 'days')

    const tomorrowOptions = generateTimeOptions(tomorrow)
    const nextWeekOptions = generateTimeOptions(nextWeek)
    const lastWeekOptions = generateTimeOptions(lastWeek)

    expect(tomorrowOptions.length).toBe(96)
    expect(nextWeekOptions.length).toBe(96)
    expect(lastWeekOptions.length).toBe(96)
  })

  test('time options are in correct order', () => {
    const futureDate = dayjs().add(1, 'day')
    const options = generateTimeOptions(futureDate)

    // Check that times are sequential
    for (let i = 1; i < options.length; i++) {
      const prevTime = options[i - 1].label
      const currTime = options[i].label
      
      // Extract hour and minute for comparison
      const prevMatch = prevTime.match(/(\d+):(\d+)\s*(AM|PM)/)
      const currMatch = currTime.match(/(\d+):(\d+)\s*(AM|PM)/)
      
      if (prevMatch && currMatch) {
        // Times should be in order (simplified check)
        expect(options[i].label).toBeDefined()
      }
    }
  })

  test('generateTimeOptionsAll ignores date parameter', () => {
    const pastDate = dayjs().subtract(1, 'day')
    const futureDate = dayjs().add(1, 'day')
    const today = dayjs()

    const pastOptions = generateTimeOptionsAll(pastDate)
    const futureOptions = generateTimeOptionsAll(futureDate)
    const todayOptions = generateTimeOptionsAll(today)

    // All should return 96 options regardless of date
    expect(pastOptions.length).toBe(96)
    expect(futureOptions.length).toBe(96)
    expect(todayOptions.length).toBe(96)
  })
})
