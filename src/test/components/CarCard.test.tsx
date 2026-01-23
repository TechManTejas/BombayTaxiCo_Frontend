import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import CarCard, { Feature } from '../../components/CarCard'

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

describe('CarCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    })
  })

  test('renders CarCard with all props', () => {
    render(<CarCard {...defaultProps} />)

    expect(screen.getByText('Sedan')).toBeInTheDocument()
    expect(screen.getByText('Comfortable sedan for city rides')).toBeInTheDocument()
    expect(screen.getByText('₹ 800')).toBeInTheDocument()
    expect(screen.getByText('BOOK NOW')).toBeInTheDocument()
  })

  test('displays original price with strikethrough when discount > 0', () => {
    render(<CarCard {...defaultProps} />)

    const originalPrice = screen.getByText('₹ 1,000')
    expect(originalPrice).toHaveStyle('text-decoration: line-through')
  })

  test('does not display original price when discount is 0', () => {
    render(<CarCard {...defaultProps} discount="0" />)

    expect(screen.queryByText('₹ 1,000')).not.toBeInTheDocument()
  })

  test('renders features correctly', () => {
    render(<CarCard {...defaultProps} />)

    expect(screen.getByText('AC')).toBeInTheDocument()
    expect(screen.getByText('4 Bags')).toBeInTheDocument()
  })

  test('shows BOOK NOW button when not in preview mode', () => {
    render(<CarCard {...defaultProps} />)

    expect(screen.getByText('BOOK NOW')).toBeInTheDocument()
  })

  test('does not show BOOK NOW button in preview mode', () => {
    render(<CarCard {...defaultProps} preview={true} />)

    expect(screen.queryByText('BOOK NOW')).not.toBeInTheDocument()
  })

  test('calls onBook when BOOK NOW button is clicked', () => {
    render(<CarCard {...defaultProps} />)

    const bookButton = screen.getByText('BOOK NOW')
    fireEvent.click(bookButton)

    expect(mockOnBook).toHaveBeenCalledTimes(1)
  })

  test('calls onBook when card is clicked on mobile', () => {
    // Mock mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    })

    render(<CarCard {...defaultProps} />)

    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockOnBook).toHaveBeenCalledTimes(1)
    }
  })

  test('does not call onBook when card is clicked on desktop', () => {
    render(<CarCard {...defaultProps} />)

    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockOnBook).not.toHaveBeenCalled()
    }
  })

  test('uses default car image when carImage is undefined', () => {
    render(<CarCard {...defaultProps} carImage="undefined" />)

    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  test('formats prices with commas', () => {
    render(<CarCard {...defaultProps} discountedPrice="10000" />)

    expect(screen.getByText('₹ 10,000')).toBeInTheDocument()
  })
})
