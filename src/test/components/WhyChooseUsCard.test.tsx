import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { WhyChooseUsCard } from '../../components/WhyChooseUsCard'

describe('WhyChooseUsCard Component', () => {
  const mockProps = {
    icon: <span>🚗</span>,
    title: 'Reliable Service',
    description: 'We provide reliable taxi services'
  }

  test('renders WhyChooseUsCard with all props', () => {
    render(<WhyChooseUsCard {...mockProps} />)

    expect(screen.getByText('Reliable Service')).toBeInTheDocument()
    expect(screen.getByText('.')).toBeInTheDocument()
    expect(screen.getByText('We provide reliable taxi services')).toBeInTheDocument()
  })

  test('renders icon correctly', () => {
    render(<WhyChooseUsCard {...mockProps} />)

    expect(screen.getByText('🚗')).toBeInTheDocument()
  })

  test('has correct styling classes', () => {
    const { container } = render(<WhyChooseUsCard {...mockProps} />)

    const card = container.firstChild?.firstChild as HTMLElement
    expect(card).toHaveClass('bg-white', 'w-60', 'h-60', 'rounded-xl')
  })

  test('renders with different props', () => {
    const differentProps = {
      icon: <span>🚕</span>,
      title: 'Fast Service',
      description: 'Quick and efficient taxi service'
    }

    render(<WhyChooseUsCard {...differentProps} />)

    expect(screen.getByText('Fast Service')).toBeInTheDocument()
    expect(screen.getByText('Quick and efficient taxi service')).toBeInTheDocument()
  })

  test('renders icon correctly with different icons', () => {
    const iconProps = {
      icon: <span data-testid="custom-icon">⭐</span>,
      title: 'Test',
      description: 'Test description'
    }

    render(<WhyChooseUsCard {...iconProps} />)

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })
})

