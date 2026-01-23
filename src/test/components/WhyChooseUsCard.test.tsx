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
})

