import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { TestimonialCard } from '../../components/TestimonialCard'

describe('TestimonialCard Component', () => {
  const mockProps = {
    name: 'John Doe',
    testimonialText: 'Great service!',
    avatar: '/john.jpg',
    position: 'Customer'
  }

  test('renders TestimonialCard with props', () => {
    render(<TestimonialCard {...mockProps} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Great service!')).toBeInTheDocument()
  })

  test('renders avatar with correct background image', () => {
    const { container } = render(<TestimonialCard {...mockProps} />)

    const avatar = container.querySelector('.bg-\\[\\#FDB813\\]')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveStyle({ backgroundImage: 'url(/john.jpg)' })
  })
})

