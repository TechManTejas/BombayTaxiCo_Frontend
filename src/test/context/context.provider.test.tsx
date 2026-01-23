import { render, screen } from '@testing-library/react'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { MyContextProvider, Context } from '../../context/context.provider'

const TestComponent = () => {
  const context = Context()
  return (
    <div>
      <div data-testid="user-auth">{context.userAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="admin-auth">{context.adminAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="modal-open">{context.openAuthModal ? 'true' : 'false'}</div>
    </div>
  )
}

describe('MyContextProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('provides default context values when no tokens exist', () => {
    render(
      <MyContextProvider>
        <TestComponent />
      </MyContextProvider>
    )

    expect(screen.getByTestId('user-auth')).toHaveTextContent('false')
    expect(screen.getByTestId('admin-auth')).toHaveTextContent('false')
    expect(screen.getByTestId('modal-open')).toHaveTextContent('false')
  })

  test('provides authenticated user when token exists', () => {
    localStorage.setItem('token', 'user-token')

    render(
      <MyContextProvider>
        <TestComponent />
      </MyContextProvider>
    )

    expect(screen.getByTestId('user-auth')).toHaveTextContent('true')
  })

  test('provides authenticated admin when admin token exists', () => {
    localStorage.setItem('admin-token', 'admin-token')

    render(
      <MyContextProvider>
        <TestComponent />
      </MyContextProvider>
    )

    expect(screen.getByTestId('admin-auth')).toHaveTextContent('true')
  })

  test('throws error when Context is used outside provider', () => {
    // Mock console.error to avoid noise
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useMyContext must be used within a MyContextProvider')

    consoleSpy.mockRestore()
  })
})

