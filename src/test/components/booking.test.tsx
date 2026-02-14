import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Import booking-related components
import BookingConfirmed from '../../components/BookingConfirmed'
import Confirmation from '../../components/Confirmation'
import CarCard from '../../components/CarCard'
import DetailsCarCard from '../../components/DetailsCarCard'

describe('Booking Components', () => {
  describe('BookingConfirmed', () => {
    it('renders booking confirmation', () => {
      render(<BookingConfirmed />)
      expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument()
    })
  })

  describe('Confirmation', () => {
    it('renders confirmation dialog', () => {
      render(<Confirmation />)
      expect(screen.getByText(/confirm/i)).toBeInTheDocument()
    })
  })

  describe('CarCard', () => {
    it('renders car card', () => {
      render(<CarCard />)
      expect(screen.getByRole('img')).toBeInTheDocument()
    })
  })

  describe('DetailsCarCard', () => {
    it('renders detailed car card', () => {
      render(<DetailsCarCard />)
      expect(screen.getByText(/car/i)).toBeInTheDocument()
    })
  })
})
