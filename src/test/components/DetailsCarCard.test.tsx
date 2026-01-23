import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import DetailsCarCard, { Feature } from '../../components/DetailsCarCard'

const mockOnBook = vi.fn()

const mockFeatures: Feature[] = [
  { icon: 'Air Conditioning', feature: 'AC' },
  { icon: 'Bags', feature: '4 Bags' },
  { feature: 'Manual' }
]

const defaultProps = {
  category: 'Sedan',
  description: 'Comfortable sedan for city rides',
  features: mockFeatures,
  originalPrice: '1000',
  discountedPrice: '800',
  discount: '20',
  preview: false,
  carImage: 'car.jpg',
  onBook: mockOnBook
}

describe('DetailsCarCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    })
  })

  test('renders DetailsCarCard with all props', () => {
    render(<DetailsCarCard {...defaultProps} />)

    expect(screen.getByText('Sedan')).toBeInTheDocument()
    expect(screen.getByText('Comfortable sedan for city rides')).toBeInTheDocument()
    expect(screen.getByText('Inclusive Of Toll & Sate Tax')).toBeInTheDocument()
  })

  test('renders features correctly', () => {
    render(<DetailsCarCard {...defaultProps} />)

    expect(screen.getByText('AC')).toBeInTheDocument()
    expect(screen.getByText('4 Bags')).toBeInTheDocument()
  })

  test('shows BOOK NOW button when not in preview mode', () => {
    render(<DetailsCarCard {...defaultProps} />)

    expect(screen.getByText('BOOK NOW')).toBeInTheDocument()
  })

  test('does not show BOOK NOW button in preview mode', () => {
    render(<DetailsCarCard {...defaultProps} preview={true} />)

    expect(screen.queryByText('BOOK NOW')).not.toBeInTheDocument()
  })

  test('calls onBook when BOOK NOW button is clicked', () => {
    render(<DetailsCarCard {...defaultProps} />)

    const bookButton = screen.getByText('BOOK NOW')
    fireEvent.click(bookButton)

    expect(mockOnBook).toHaveBeenCalledTimes(1)
  })

  test('calls onBook when card is clicked on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    })

    render(<DetailsCarCard {...defaultProps} />)

    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockOnBook).toHaveBeenCalledTimes(1)
    }
  })

  test('does not call onBook when card is clicked on desktop', () => {
    render(<DetailsCarCard {...defaultProps} />)

    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockOnBook).not.toHaveBeenCalled()
    }
  })
})

