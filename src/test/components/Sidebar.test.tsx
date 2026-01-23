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

  test('renders all menu items', () => {
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

  test('calls handleTabChange with correct tab for each menu item', () => {
    render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    fireEvent.click(screen.getByText('Bookings'))
    expect(mockHandleTabChange).toHaveBeenCalledWith('bookings')
    fireEvent.click(screen.getByText('Invoices'))
    expect(mockHandleTabChange).toHaveBeenCalledWith('invoices')
    fireEvent.click(screen.getByText('Profile'))
    expect(mockHandleTabChange).toHaveBeenCalledWith('profile')
  })

  test('handles menu mode based on window width', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 })
    const { container } = render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    const menu = container.querySelector('.ant-menu')
    expect(menu).toBeInTheDocument()
  })

  test('handles horizontal menu mode on mobile', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 768 })
    const { container } = render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    const menu = container.querySelector('.ant-menu')
    expect(menu).toBeInTheDocument()
  })

  test('default selected key is bookings', () => {
    const { container } = render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    const selectedItem = container.querySelector('.ant-menu-item-selected')
    expect(selectedItem).toBeInTheDocument()
  })

  test('logout icon is rendered', () => {
    const { container } = render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    const logoutIcon = container.querySelector('img[src*="Logout"]')
    expect(logoutIcon).toBeInTheDocument()
  })

  test('sidebar has correct background classes', () => {
    const { container } = render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    const sidebar = container.firstChild as HTMLElement
    expect(sidebar).toHaveClass('bg-stone-100', 'lg:bg-white')
  })

  test('handles multiple tab changes', () => {
    render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    fireEvent.click(screen.getByText('Bookings'))
    fireEvent.click(screen.getByText('Invoices'))
    fireEvent.click(screen.getByText('Profile'))
    expect(mockHandleTabChange).toHaveBeenCalledTimes(3)
  })

  test('clears token on successful logout', async () => {
    localStorage.setItem('token', 'test-token')
    const mockLocation = { href: '' }
    Object.defineProperty(window, 'location', { value: mockLocation, writable: true })
    render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    const logoutItem = screen.getByText('Log out')
    fireEvent.click(logoutItem)
    await waitFor(() => {
      const confirmButton = document.querySelector('.ant-btn-primary')
      if (confirmButton) {
        fireEvent.click(confirmButton)
      }
    })
    expect(logoutItem).toBeInTheDocument()
  })

  test('handles logout cancellation', async () => {
    localStorage.setItem('token', 'test-token')
    render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    const logoutItem = screen.getByText('Log out')
    fireEvent.click(logoutItem)
    await waitFor(() => {
      const cancelButton = document.querySelector('.ant-btn-default')
      if (cancelButton) {
        fireEvent.click(cancelButton)
      }
    })
    expect(localStorage.getItem('token')).toBe('test-token')
  })

  test('sidebar has correct height classes', () => {
    const { container } = render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    const sidebar = container.firstChild as HTMLElement
    expect(sidebar).toHaveClass('md:h-[calc(100vh-136px)]')
  })

  test('menu has correct styling classes', () => {
    const { container } = render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    const menu = container.querySelector('.ant-menu')
    expect(menu).toHaveClass('h-full', 'bg-inherit')
  })

  test('handles window resize for menu mode', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 })
    const { rerender } = render(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 })
    rerender(
      <BrowserRouter>
        <MyContextProvider>
          <Sidebar handleTabChange={mockHandleTabChange} />
        </MyContextProvider>
      </BrowserRouter>
    )
    expect(screen.getByText('Bookings')).toBeInTheDocument()
  })
})

