import { render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { BookingConfirmed } from '../../components/BookingConfirmed'

describe('BookingConfirmed Component', () => {
  test('renders BookingConfirmed component', () => {
    render(<BookingConfirmed />)

    expect(document.body).toBeInTheDocument()
  })
})

