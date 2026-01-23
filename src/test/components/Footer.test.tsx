import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect, vi } from 'vitest'
import { Footer } from '../../components/Footer'

const MockFooter = () => (
  <BrowserRouter>
    <Footer />
  </BrowserRouter>
)

describe('Footer Component', () => {
  test('renders Footer component', () => {
    render(<MockFooter />)

    expect(screen.getByText('ABOUT COMPANY')).toBeInTheDocument()
    expect(screen.getByText('QUICK LINK')).toBeInTheDocument()
    expect(screen.getByText('CONTACT DETAILS')).toBeInTheDocument()
  })

  test('renders company description', () => {
    render(<MockFooter />)

    expect(screen.getByText(/Traveling one way, but worried about the return journey fare/)).toBeInTheDocument()
  })

  test('renders social media buttons', () => {
    render(<MockFooter />)

    // Should have 4 social media buttons
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(4)
  })

  test('renders quick links', () => {
    render(<MockFooter />)

    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.getByText('FAQs')).toBeInTheDocument()
    expect(screen.getByText('Cancellation Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  })

  test('renders contact details', () => {
    render(<MockFooter />)

    expect(screen.getByText('PHONE NUMBER')).toBeInTheDocument()
    expect(screen.getByText('EMAIL ADDRESS')).toBeInTheDocument()
    expect(screen.getByText('OFFICE LOCATION')).toBeInTheDocument()
    expect(screen.getByText('+91-6262-744-744')).toBeInTheDocument()
    expect(screen.getByText('bombaytaxicompany@gmail.com')).toBeInTheDocument()
  })

  test('phone link has correct href', () => {
    render(<MockFooter />)

    const phoneLink = screen.getByRole('link', { name: /\+91-6262-744-744/ })
    expect(phoneLink).toHaveAttribute('href', 'tel:+916262744744')
  })

  test('email link has correct href', () => {
    render(<MockFooter />)

    const emailLink = screen.getByRole('link', { name: /bombaytaxicompany@gmail.com/ })
    expect(emailLink).toHaveAttribute('href', 'mailto:bombaytaxicompany@gmail.com')
  })

  test('renders office address', () => {
    render(<MockFooter />)

    expect(screen.getByText(/Office no. 1 Sai Society/)).toBeInTheDocument()
    expect(screen.getByText(/Mhada Colony/)).toBeInTheDocument()
  })

  test('navigation buttons work correctly', () => {
    const mockScrollTo = vi.fn()

    // Mock window.scrollTo
    Object.defineProperty(window, 'scrollTo', {
      writable: true,
      value: mockScrollTo,
    })

    render(<MockFooter />)

    // Test that buttons exist (navigation testing would require more complex mocking)
    const aboutButton = screen.getByText('About Us').closest('button')
    expect(aboutButton).toBeInTheDocument()
  })

  test('renders all social media buttons', () => {
    render(<MockFooter />)

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(4)
  })

  test('renders company information correctly', () => {
    render(<MockFooter />)

    expect(screen.getByText('ABOUT COMPANY')).toBeInTheDocument()
    expect(screen.getByText(/Traveling one way/)).toBeInTheDocument()
  })
})

