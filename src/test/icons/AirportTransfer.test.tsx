import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { AirportTransferIcon } from '../../icons/AirportTransfer'

describe('AirportTransferIcon Component', () => {
  test('renders AirportTransferIcon component', () => {
    render(<AirportTransferIcon />)

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveClass('h-12')
  })
})

