import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { CallUsNow } from '../../components/CallUsNow'

describe('CallUsNow Component', () => {
  test('renders CallUsNow component', () => {
    render(<CallUsNow />)

    expect(screen.getByText('Call 24 Hour Service Available')).toBeInTheDocument()
    expect(screen.getByText('Call Now & Book Your Taxi For Your Next Ride')).toBeInTheDocument()
    expect(screen.getByText('+91-6262-744-744')).toBeInTheDocument()
  })

  test('renders phone number link', () => {
    render(<CallUsNow />)

    const phoneLink = screen.getByRole('link', { name: /\+91-6262-744-744/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:+916262744744')
  })

  test('component has correct structure', () => {
    const { container } = render(<CallUsNow />)

    // Check if the main div with hidden class exists
    const mainDiv = container.firstChild as HTMLElement
    expect(mainDiv).toHaveClass('hidden', 'bg-[#FDB813]', 'h-60')
  })
})

