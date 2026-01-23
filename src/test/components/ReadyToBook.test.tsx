import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { ReadyToBook } from '../../components/ReadyToBook'

describe('ReadyToBook Component', () => {
  test('renders ReadyToBook component', () => {
    render(<ReadyToBook />)

    expect(screen.getByText('Ready to book?')).toBeInTheDocument()
    expect(screen.getByText('BOOK NOW')).toBeInTheDocument()
  })

  test('BOOK NOW button navigates to home', () => {
    const mockLocation = { href: '' }
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    })

    render(<ReadyToBook />)

    const bookButton = screen.getByText('BOOK NOW')
    fireEvent.click(bookButton)

    expect(window.location.href).toBe('/')
  })

  test('has correct styling classes', () => {
    const { container } = render(<ReadyToBook />)

    const mainContainer = container.firstChild as HTMLElement
    expect(mainContainer).toHaveClass('w-full', 'flex', 'justify-center', 'lg:py-8')
  })
})

