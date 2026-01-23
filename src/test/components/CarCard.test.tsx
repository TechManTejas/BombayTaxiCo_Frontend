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
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1200 })
  })

  test('renders CarCard with all props and pricing', () => {
    render(<CarCard {...defaultProps} />)
    expect(screen.getByText('Sedan')).toBeInTheDocument()
    expect(screen.getByText('Comfortable sedan for city rides')).toBeInTheDocument()
    expect(screen.getByText('₹ 800')).toBeInTheDocument()
    expect(screen.getByText('BOOK NOW')).toBeInTheDocument()
    expect(screen.getByText('₹ 1,000')).toHaveStyle('text-decoration: line-through')
  })

  test('handles discount and preview modes', () => {
    render(<CarCard {...defaultProps} discount="0" />)
    expect(screen.queryByText('₹ 1,000')).not.toBeInTheDocument()
    render(<CarCard {...defaultProps} preview={true} />)
    expect(screen.queryByText('BOOK NOW')).not.toBeInTheDocument()
  })

  test('renders features correctly', () => {
    render(<CarCard {...defaultProps} />)
    expect(screen.getByText('AC')).toBeInTheDocument()
    expect(screen.getByText('4 Bags')).toBeInTheDocument()
  })

  test('handles onBook callback for button and mobile clicks', () => {
    render(<CarCard {...defaultProps} />)
    fireEvent.click(screen.getByText('BOOK NOW'))
    expect(mockOnBook).toHaveBeenCalledTimes(1)
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 800 })
    const { rerender } = render(<CarCard {...defaultProps} />)
    const card = screen.getByText('Sedan').closest('div')
    if (card) { fireEvent.click(card); expect(mockOnBook).toHaveBeenCalledTimes(2) }
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1200 })
    rerender(<CarCard {...defaultProps} />)
    const desktopCard = screen.getByText('Sedan').closest('div')
    if (desktopCard) { fireEvent.click(desktopCard); expect(mockOnBook).toHaveBeenCalledTimes(2) }
  })

  test('handles images, prices, and edge cases', () => {
    render(<CarCard {...defaultProps} carImage="undefined" />)
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0)
    const { rerender } = render(<CarCard {...defaultProps} discountedPrice="10000" />)
    expect(screen.getByText('₹ 10,000')).toBeInTheDocument()
    rerender(<CarCard {...defaultProps} features={[]} />)
    expect(screen.getByText('Sedan')).toBeInTheDocument()
    rerender(<CarCard {...defaultProps} onBook={undefined} />)
    fireEvent.click(screen.getByText('BOOK NOW'))
    expect(screen.getByText('Prices From')).toBeInTheDocument()
  })

  test('handles all feature icon types', () => {
    const allFeatureIcons: Feature[] = [
      { icon: 'Air Conditioning', feature: 'AC' },
      { icon: 'Automatic Transmission', feature: 'Auto' }
    ]
    render(<CarCard {...defaultProps} features={allFeatureIcons} />)
    expect(screen.getByText('AC')).toBeInTheDocument()
  })

  test('formats prices with commas correctly', () => {
    render(<CarCard {...defaultProps} discountedPrice="10000" originalPrice="12000" />)
    expect(screen.getByText('₹ 10,000')).toBeInTheDocument()
    expect(screen.getByText('₹ 12,000')).toBeInTheDocument()
  })

  test('handles very large price values', () => {
    render(<CarCard {...defaultProps} discountedPrice="100000" originalPrice="150000" />)
    expect(screen.getByText('₹ 100,000')).toBeInTheDocument()
    expect(screen.getByText('₹ 150,000')).toBeInTheDocument()
  })

  test('handles single digit prices', () => {
    render(<CarCard {...defaultProps} discountedPrice="5" originalPrice="10" />)
    expect(screen.getByText('₹ 5')).toBeInTheDocument()
    expect(screen.getByText('₹ 10')).toBeInTheDocument()
  })

  test('displays discount percentage correctly', () => {
    render(<CarCard {...defaultProps} discount="25" />)
    expect(screen.getByText(/25/)).toBeInTheDocument()
  })

  test('handles zero discount', () => {
    render(<CarCard {...defaultProps} discount="0" />)
    expect(screen.queryByText('₹ 1,000')).not.toBeInTheDocument()
    expect(screen.getByText('₹ 800')).toBeInTheDocument()
  })

  test('renders category name correctly', () => {
    render(<CarCard {...defaultProps} category="SUV" />)
    expect(screen.getByText('SUV')).toBeInTheDocument()
  })

  test('renders description text', () => {
    render(<CarCard {...defaultProps} description="Luxury SUV for long journeys" />)
    expect(screen.getByText('Luxury SUV for long journeys')).toBeInTheDocument()
  })

  test('handles empty features array', () => {
    render(<CarCard {...defaultProps} features={[]} />)
    expect(screen.getByText('Sedan')).toBeInTheDocument()
    expect(screen.getByText('BOOK NOW')).toBeInTheDocument()
  })

  test('handles features without icons', () => {
    const featuresWithoutIcons: Feature[] = [{ feature: 'Manual Transmission' }]
    render(<CarCard {...defaultProps} features={featuresWithoutIcons} />)
    expect(screen.getByText('Manual Transmission')).toBeInTheDocument()
  })

  test('handles multiple features with icons', () => {
    const multipleFeatures: Feature[] = [
      { icon: 'Air Conditioning', feature: 'AC' },
      { icon: 'Bags', feature: '4 Bags' },
      { icon: 'Automatic Transmission', feature: 'Auto' }
    ]
    render(<CarCard {...defaultProps} features={multipleFeatures} />)
    expect(screen.getByText('AC')).toBeInTheDocument()
    expect(screen.getByText('4 Bags')).toBeInTheDocument()
    expect(screen.getByText('Auto')).toBeInTheDocument()
  })

  test('does not trigger onBook on desktop card click', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 })
    render(<CarCard {...defaultProps} />)
    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockOnBook).not.toHaveBeenCalled()
    }
  })

  test('triggers onBook on mobile card click', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 768 })
    render(<CarCard {...defaultProps} />)
    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockOnBook).toHaveBeenCalledTimes(1)
    }
  })

  test('handles undefined onBook callback gracefully', () => {
    render(<CarCard {...defaultProps} onBook={undefined} />)
    const bookButton = screen.getByText('BOOK NOW')
    fireEvent.click(bookButton)
    expect(bookButton).toBeInTheDocument()
  })

  test('renders Prices From text when not preview', () => {
    render(<CarCard {...defaultProps} />)
    expect(screen.getByText('Prices From')).toBeInTheDocument()
  })

  test('renders car image when carImage is provided', () => {
    render(<CarCard {...defaultProps} carImage="test-car.jpg" />)
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  test('renders default car image when carImage is undefined', () => {
    render(<CarCard {...defaultProps} carImage="undefined" />)
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  test('handles boundary width for mobile/desktop detection', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1023 })
    render(<CarCard {...defaultProps} />)
    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockOnBook).toHaveBeenCalledTimes(1)
    }
  })

  test('handles boundary width for desktop detection', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 })
    render(<CarCard {...defaultProps} />)
    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockOnBook).not.toHaveBeenCalled()
    }
  })
})
