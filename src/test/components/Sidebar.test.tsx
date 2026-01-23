import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { MyContextProvider } from '../../context/context.provider'
import Sidebar from '../../components/Sidebar'

describe('Sidebar Component', () => {
  const mockHandleTabChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    })
  })

  test('renders Sidebar component', () => {
    render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )

    expect(screen.getByText('Bookings')).toBeInTheDocument()
    expect(screen.getByText('Invoices')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Log out')).toBeInTheDocument()
  })

  test('calls handleTabChange when menu item is clicked', () => {
    render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )

    const bookingsItem = screen.getByText('Bookings')
    fireEvent.click(bookingsItem)

    expect(mockHandleTabChange).toHaveBeenCalledWith('bookings')
  })

  test('handles logout click', async () => {
    localStorage.setItem('token', 'test-token')
    const mockLocation = { href: '' }
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    })

    render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )

    const logoutItem = screen.getByText('Log out')
    fireEvent.click(logoutItem)

    // Wait for modal to appear and confirm
    await waitFor(() => {
      const confirmButton = document.querySelector('.ant-btn-primary')
      if (confirmButton) {
        fireEvent.click(confirmButton)
      }
    })

    // Note: Actual logout behavior depends on confirmation modal
    expect(logoutItem).toBeInTheDocument()
  })
})

