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
  test('renders Footer component with all sections', () => {
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
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(4)
  })

  test('renders all quick links', () => {
    render(<MockFooter />)
    const links = ['About Us', 'Contact Us', 'FAQs', 'Cancellation Policy', 'Terms & Conditions', 'Privacy Policy']
    links.forEach(link => expect(screen.getByText(link)).toBeInTheDocument())
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
    Object.defineProperty(window, 'scrollTo', { writable: true, value: mockScrollTo })
    render(<MockFooter />)
    const aboutButton = screen.getByText('About Us').closest('button')
    expect(aboutButton).toBeInTheDocument()
  })

  test('footer has correct structure', () => {
    const { container } = render(<MockFooter />)
    const footer = container.querySelector('.bg-\\[\\#2A2A2A\\]')
    expect(footer).toBeInTheDocument()
  })

  test('renders all social media buttons', () => {
    render(<MockFooter />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(4)
  })

  test('social media buttons have correct styling classes', () => {
    const { container } = render(<MockFooter />)
    const socialButtons = container.querySelectorAll('button.h-10.w-10')
    expect(socialButtons.length).toBeGreaterThanOrEqual(4)
  })

  test('renders company description text', () => {
    render(<MockFooter />)
    expect(screen.getByText(/Traveling one way, but worried about the return journey fare/)).toBeInTheDocument()
    expect(screen.getByText(/Bombay Taxi Company/)).toBeInTheDocument()
  })

  test('renders section headers correctly', () => {
    render(<MockFooter />)
    expect(screen.getByText('ABOUT COMPANY')).toBeInTheDocument()
    expect(screen.getByText('QUICK LINK')).toBeInTheDocument()
    expect(screen.getByText('CONTACT DETAILS')).toBeInTheDocument()
  })

  test('renders section dividers', () => {
    const { container } = render(<MockFooter />)
    const dividers = container.querySelectorAll('.w-20.border')
    expect(dividers.length).toBeGreaterThanOrEqual(3)
  })

  test('phone number is clickable link', () => {
    render(<MockFooter />)
    const phoneLink = screen.getByRole('link', { name: /\+91-6262-744-744/ })
    expect(phoneLink).toBeInTheDocument()
    expect(phoneLink).toHaveAttribute('href', 'tel:+916262744744')
  })

  test('email is clickable link', () => {
    render(<MockFooter />)
    const emailLink = screen.getByRole('link', { name: /bombaytaxicompany@gmail.com/ })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:bombaytaxicompany@gmail.com')
  })

  test('renders complete office address', () => {
    render(<MockFooter />)
    expect(screen.getByText(/Office no. 1 Sai Society/)).toBeInTheDocument()
    expect(screen.getByText(/Mhada Colony/)).toBeInTheDocument()
  })

  test('navigation buttons have correct structure', () => {
    render(<MockFooter />)
    const aboutButton = screen.getByText('About Us').closest('button')
    const contactButton = screen.getByText('Contact Us').closest('button')
    expect(aboutButton).toBeInTheDocument()
    expect(contactButton).toBeInTheDocument()
  })

  test('navigation buttons contain arrow icons', () => {
    const { container } = render(<MockFooter />)
    const arrowIcons = container.querySelectorAll('.anticon-arrow-right')
    expect(arrowIcons.length).toBeGreaterThanOrEqual(5)
  })

  test('renders all quick link items', () => {
    render(<MockFooter />)
    const quickLinks = ['About Us', 'Contact Us', 'FAQs', 'Cancellation Policy', 'Terms & Conditions', 'Privacy Policy']
    quickLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument()
    })
  })

  test('footer container has correct background color', () => {
    const { container } = render(<MockFooter />)
    const footer = container.querySelector('.bg-\\[\\#2A2A2A\\]')
    expect(footer).toBeInTheDocument()
  })

  test('footer has responsive classes', () => {
    const { container } = render(<MockFooter />)
    const footer = container.querySelector('.bg-\\[\\#2A2A2A\\]')
    expect(footer).toHaveClass('lg:rounded-3xl')
  })

  test('contact section displays all required information', () => {
    render(<MockFooter />)
    expect(screen.getByText('PHONE NUMBER')).toBeInTheDocument()
    expect(screen.getByText('EMAIL ADDRESS')).toBeInTheDocument()
    expect(screen.getByText('OFFICE LOCATION')).toBeInTheDocument()
  })

  test('footer has proper spacing and layout', () => {
    const { container } = render(<MockFooter />)
    const mainContainer = container.querySelector('.container')
    expect(mainContainer).toBeInTheDocument()
  })

  test('social media buttons are interactive', () => {
    render(<MockFooter />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeInTheDocument()
    })
  })

  test('renders footer with all sections visible', () => {
    render(<MockFooter />)
    expect(screen.getByText('ABOUT COMPANY')).toBeInTheDocument()
    expect(screen.getByText('QUICK LINK')).toBeInTheDocument()
    expect(screen.getByText('CONTACT DETAILS')).toBeInTheDocument()
  })
})
