import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import { ServiceCard } from '../../components/ServiceCard'

const mockProps = {
  icon: <span>🚗</span>,
  feature: 'Taxi Service',
  title: 'City Taxi',
  description: 'Reliable taxi service in the city',
  detailsUrl: '/services/taxi',
  image: '/taxi.jpg'
}

const MockServiceCard = () => (
  <BrowserRouter>
    <ServiceCard {...mockProps} />
  </BrowserRouter>
)

describe('ServiceCard Component', () => {
  test('renders ServiceCard with all props', () => {
    render(<MockServiceCard />)

    expect(screen.getByText('City Taxi')).toBeInTheDocument()
    expect(screen.getByText('Reliable taxi service in the city')).toBeInTheDocument()
    expect(screen.getByText('🚗')).toBeInTheDocument()
  })

  test('renders image with correct src', () => {
    render(<MockServiceCard />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/taxi.jpg')
  })

  test('has correct structure and classes', () => {
    const { container } = render(<MockServiceCard />)

    const mainDiv = container.firstChild as HTMLElement
    expect(mainDiv).toHaveClass('relative', 'w-[320px]', 'h-[340px]', 'select-none')
  })

  test('renders with different props', () => {
    const differentProps = {
      icon: <span>🚕</span>,
      feature: 'Airport Transfer',
      title: 'Airport Service',
      description: 'Reliable airport transfer service',
      detailsUrl: '/services/airport',
      image: '/airport.jpg'
    }

    render(
      <BrowserRouter>
        <ServiceCard {...differentProps} />
      </BrowserRouter>
    )

    expect(screen.getByText('Airport Service')).toBeInTheDocument()
    expect(screen.getByText('Reliable airport transfer service')).toBeInTheDocument()
  })

  test('renders icon correctly', () => {
    render(<MockServiceCard />)

    expect(screen.getByText('🚗')).toBeInTheDocument()
  })
})

