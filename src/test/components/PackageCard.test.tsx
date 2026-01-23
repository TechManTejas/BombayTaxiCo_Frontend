import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { PackageCard } from '../../components/PackageCard'

describe('PackageCard Component', () => {
  const mockProps = {
    imageUrl: '/package.jpg',
    title: 'Premium Package',
    destinations: [
      { name: 'Mumbai', distance: '50 km' },
      { name: 'Pune', distance: '150 km' }
    ]
  }

  test('renders PackageCard with props', () => {
    render(<PackageCard {...mockProps} />)

    expect(screen.getByText('Premium Package')).toBeInTheDocument()
    expect(screen.getByText('Mumbai')).toBeInTheDocument()
    expect(screen.getByText('Pune')).toBeInTheDocument()
  })
})

