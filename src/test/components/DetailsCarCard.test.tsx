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

  test('renders price information correctly', () => {
    render(<DetailsCarCard {...defaultProps} />)
    expect(screen.getByText('Inclusive Of Toll & Sate Tax')).toBeInTheDocument()
  })

  test('formats discounted price with commas', () => {
    render(<DetailsCarCard {...defaultProps} discountedPrice="10000" />)
    expect(screen.getByText(/10,000/)).toBeInTheDocument()
  })

  test('formats original price with commas', () => {
    render(<DetailsCarCard {...defaultProps} originalPrice="15000" />)
    expect(screen.getByText(/15,000/)).toBeInTheDocument()
  })

  test('handles large price values', () => {
    render(<DetailsCarCard {...defaultProps} discountedPrice="100000" originalPrice="120000" />)
    expect(screen.getByText(/100,000/)).toBeInTheDocument()
    expect(screen.getByText(/120,000/)).toBeInTheDocument()
  })

  test('displays discount percentage', () => {
    render(<DetailsCarCard {...defaultProps} discount="30" />)
    expect(screen.getByText(/30/)).toBeInTheDocument()
  })

  test('handles zero discount', () => {
    render(<DetailsCarCard {...defaultProps} discount="0" />)
    expect(screen.getByText('Sedan')).toBeInTheDocument()
  })

  test('renders category name', () => {
    render(<DetailsCarCard {...defaultProps} category="SUV" />)
    expect(screen.getByText('SUV')).toBeInTheDocument()
  })

  test('renders description text', () => {
    render(<DetailsCarCard {...defaultProps} description="Premium SUV for family trips" />)
    expect(screen.getByText('Premium SUV for family trips')).toBeInTheDocument()
  })

  test('handles empty features array', () => {
    render(<DetailsCarCard {...defaultProps} features={[]} />)
    expect(screen.getByText('Sedan')).toBeInTheDocument()
    expect(screen.getByText('BOOK NOW')).toBeInTheDocument()
  })

  test('handles features without icons', () => {
    const featuresWithoutIcons: Feature[] = [{ feature: 'Manual Gear' }]
    render(<DetailsCarCard {...defaultProps} features={featuresWithoutIcons} />)
    expect(screen.getByText('Manual Gear')).toBeInTheDocument()
  })

  test('handles multiple features', () => {
    const multipleFeatures: Feature[] = [
      { icon: 'Air Conditioning', feature: 'AC' },
      { icon: 'Bags', feature: '4 Bags' },
      { icon: 'Automatic Transmission', feature: 'Auto' },
      { feature: 'Manual' }
    ]
    render(<DetailsCarCard {...defaultProps} features={multipleFeatures} />)
    expect(screen.getByText('AC')).toBeInTheDocument()
    expect(screen.getByText('4 Bags')).toBeInTheDocument()
    expect(screen.getByText('Auto')).toBeInTheDocument()
    expect(screen.getByText('Manual')).toBeInTheDocument()
  })

  test('handles boundary width for mobile detection', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1023 })
    render(<DetailsCarCard {...defaultProps} />)
    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockOnBook).toHaveBeenCalledTimes(1)
    }
  })

  test('handles boundary width for desktop detection', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 })
    render(<DetailsCarCard {...defaultProps} />)
    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockOnBook).not.toHaveBeenCalled()
    }
  })

  test('handles undefined onBook callback', () => {
    render(<DetailsCarCard {...defaultProps} onBook={undefined} />)
    const card = screen.getByText('Sedan').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(card).toBeInTheDocument()
    }
  })

  test('renders car image when provided', () => {
    render(<DetailsCarCard {...defaultProps} carImage="test-image.jpg" />)
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  test('renders default car image when carImage is undefined', () => {
    render(<DetailsCarCard {...defaultProps} carImage="undefined" />)
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  test('BOOK NOW button is clickable when not in preview', () => {
    render(<DetailsCarCard {...defaultProps} />)
    const bookButton = screen.getByText('BOOK NOW')
    expect(bookButton).toBeInTheDocument()
    fireEvent.click(bookButton)
    expect(mockOnBook).toHaveBeenCalledTimes(1)
  })

  test('handles different screen sizes for mobile click', () => {
    const widths = [320, 480, 768, 1023]
    widths.forEach(width => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width })
      const { unmount } = render(<DetailsCarCard {...defaultProps} />)
      const card = screen.getByText('Sedan').closest('div')
      if (card) {
        fireEvent.click(card)
        expect(mockOnBook).toHaveBeenCalled()
      }
      unmount()
      vi.clearAllMocks()
    })
  })
})

