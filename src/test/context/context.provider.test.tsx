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
  beforeEach(() => { localStorage.clear() })

  test('provides default context values when no tokens exist', () => {
    render(<MyContextProvider><TestComponent /></MyContextProvider>)
    expect(screen.getByTestId('user-auth')).toHaveTextContent('false')
    expect(screen.getByTestId('admin-auth')).toHaveTextContent('false')
    expect(screen.getByTestId('modal-open')).toHaveTextContent('false')
  })

  test('provides authenticated user when token exists', () => {
    localStorage.setItem('token', 'user-token')
    render(<MyContextProvider><TestComponent /></MyContextProvider>)
    expect(screen.getByTestId('user-auth')).toHaveTextContent('true')
  })

  test('provides authenticated admin when admin token exists', () => {
    localStorage.setItem('admin-token', 'admin-token')
    render(<MyContextProvider><TestComponent /></MyContextProvider>)
    expect(screen.getByTestId('admin-auth')).toHaveTextContent('true')
  })

  test('throws error when Context is used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => { render(<TestComponent />) }).toThrow('useMyContext must be used within a MyContextProvider')
    consoleSpy.mockRestore()
  })

  test('handles both user and admin tokens', () => {
    localStorage.setItem('token', 'user-token')
    localStorage.setItem('admin-token', 'admin-token')
    render(<MyContextProvider><TestComponent /></MyContextProvider>)
    expect(screen.getByTestId('user-auth')).toHaveTextContent('true')
    expect(screen.getByTestId('admin-auth')).toHaveTextContent('true')
  })

  test('context provides setter functions', () => {
    const SetterTest = () => {
      const context = Context()
      return <div data-testid="has-setters">{context.setUserAuthenticated && context.setAdminAuthenticated ? 'true' : 'false'}</div>
    }
    render(<MyContextProvider><SetterTest /></MyContextProvider>)
    expect(screen.getByTestId('has-setters')).toHaveTextContent('true')
  })

  test('handles empty token strings', () => {
    localStorage.setItem('token', '')
    render(<MyContextProvider><TestComponent /></MyContextProvider>)
    expect(screen.getByTestId('user-auth')).toHaveTextContent('false')
  })

  test('modal state defaults to false', () => {
    render(<MyContextProvider><TestComponent /></MyContextProvider>)
    expect(screen.getByTestId('modal-open')).toHaveTextContent('false')
  })

  test('context structure is complete', () => {
    const StructureTest = () => {
      const context = Context()
      const hasAllProps = context.userAuthenticated !== undefined && context.adminAuthenticated !== undefined && context.openAuthModal !== undefined
      return <div data-testid="structure">{hasAllProps ? 'complete' : 'incomplete'}</div>
    }
    render(<MyContextProvider><StructureTest /></MyContextProvider>)
    expect(screen.getByTestId('structure')).toHaveTextContent('complete')
  })

  test('setUserAuthenticated updates user authentication state', () => {
    const UpdateTest = () => {
      const context = Context()
      return (
        <div>
          <div data-testid="auth-state">{context.userAuthenticated ? 'true' : 'false'}</div>
          <button onClick={() => context.setUserAuthenticated(true)}>Set Auth</button>
        </div>
      )
    }
    render(<MyContextProvider><UpdateTest /></MyContextProvider>)
    expect(screen.getByTestId('auth-state')).toHaveTextContent('false')
    fireEvent.click(screen.getByText('Set Auth'))
    expect(screen.getByTestId('auth-state')).toHaveTextContent('true')
  })

  test('setAdminAuthenticated updates admin authentication state', () => {
    const UpdateTest = () => {
      const context = Context()
      return (
        <div>
          <div data-testid="admin-state">{context.adminAuthenticated ? 'true' : 'false'}</div>
          <button onClick={() => context.setAdminAuthenticated(true)}>Set Admin</button>
        </div>
      )
    }
    render(<MyContextProvider><UpdateTest /></MyContextProvider>)
    expect(screen.getByTestId('admin-state')).toHaveTextContent('false')
    fireEvent.click(screen.getByText('Set Admin'))
    expect(screen.getByTestId('admin-state')).toHaveTextContent('true')
  })

  test('setOpenAuthModal updates modal state', () => {
    const UpdateTest = () => {
      const context = Context()
      return (
        <div>
          <div data-testid="modal-state">{context.openAuthModal ? 'true' : 'false'}</div>
          <button onClick={() => context.setOpenAuthModal(true)}>Open Modal</button>
        </div>
      )
    }
    render(<MyContextProvider><UpdateTest /></MyContextProvider>)
    expect(screen.getByTestId('modal-state')).toHaveTextContent('false')
    fireEvent.click(screen.getByText('Open Modal'))
    expect(screen.getByTestId('modal-state')).toHaveTextContent('true')
  })

  test('context persists authentication state across re-renders', () => {
    localStorage.setItem('token', 'persistent-token')
    const { rerender } = render(<MyContextProvider><TestComponent /></MyContextProvider>)
    expect(screen.getByTestId('user-auth')).toHaveTextContent('true')
    rerender(<MyContextProvider><TestComponent /></MyContextProvider>)
    expect(screen.getByTestId('user-auth')).toHaveTextContent('true')
  })

  test('handles token removal and updates state', () => {
    localStorage.setItem('token', 'temp-token')
    const UpdateTest = () => {
      const context = Context()
      return (
        <div>
          <div data-testid="auth-state">{context.userAuthenticated ? 'true' : 'false'}</div>
          <button onClick={() => { localStorage.removeItem('token'); context.setUserAuthenticated(false) }}>Remove Token</button>
        </div>
      )
    }
    render(<MyContextProvider><UpdateTest /></MyContextProvider>)
    expect(screen.getByTestId('auth-state')).toHaveTextContent('true')
    fireEvent.click(screen.getByText('Remove Token'))
    expect(screen.getByTestId('auth-state')).toHaveTextContent('false')
  })

  test('handles admin token removal and updates state', () => {
    localStorage.setItem('admin-token', 'temp-admin-token')
    const UpdateTest = () => {
      const context = Context()
      return (
        <div>
          <div data-testid="admin-state">{context.adminAuthenticated ? 'true' : 'false'}</div>
          <button onClick={() => { localStorage.removeItem('admin-token'); context.setAdminAuthenticated(false) }}>Remove Admin</button>
        </div>
      )
    }
    render(<MyContextProvider><UpdateTest /></MyContextProvider>)
    expect(screen.getByTestId('admin-state')).toHaveTextContent('true')
    fireEvent.click(screen.getByText('Remove Admin'))
    expect(screen.getByTestId('admin-state')).toHaveTextContent('false')
  })

  test('context provides all required properties', () => {
    const PropsTest = () => {
      const context = Context()
      const hasAllProps = 
        'userAuthenticated' in context &&
        'setUserAuthenticated' in context &&
        'adminAuthenticated' in context &&
        'setAdminAuthenticated' in context &&
        'openAuthModal' in context &&
        'setOpenAuthModal' in context
      return <div data-testid="props">{hasAllProps ? 'all' : 'missing'}</div>
    }
    render(<MyContextProvider><PropsTest /></MyContextProvider>)
    expect(screen.getByTestId('props')).toHaveTextContent('all')
  })

  test('handles rapid state changes', () => {
    const RapidTest = () => {
      const context = Context()
      return (
        <div>
          <div data-testid="auth">{context.userAuthenticated ? 'true' : 'false'}</div>
          <button onClick={() => { context.setUserAuthenticated(true); context.setUserAuthenticated(false); context.setUserAuthenticated(true) }}>Toggle</button>
        </div>
      )
    }
    render(<MyContextProvider><RapidTest /></MyContextProvider>)
    fireEvent.click(screen.getByText('Toggle'))
    expect(screen.getByTestId('auth')).toHaveTextContent('true')
  })

  test('initializes with correct default values', () => {
    localStorage.clear()
    render(<MyContextProvider><TestComponent /></MyContextProvider>)
    expect(screen.getByTestId('user-auth')).toHaveTextContent('false')
    expect(screen.getByTestId('admin-auth')).toHaveTextContent('false')
    expect(screen.getByTestId('modal-open')).toHaveTextContent('false')
  })

  test('handles multiple context consumers', () => {
    const MultiConsumer = () => {
      const context1 = Context()
      const context2 = Context()
      return (
        <div>
          <div data-testid="consumer1">{context1.userAuthenticated ? 'true' : 'false'}</div>
          <div data-testid="consumer2">{context2.userAuthenticated ? 'true' : 'false'}</div>
        </div>
      )
    }
    localStorage.setItem('token', 'shared-token')
    render(<MyContextProvider><MultiConsumer /></MyContextProvider>)
    expect(screen.getByTestId('consumer1')).toHaveTextContent('true')
    expect(screen.getByTestId('consumer2')).toHaveTextContent('true')
  })

  test('context values are boolean types', () => {
    const TypeTest = () => {
      const context = Context()
      const areBooleans = 
        typeof context.userAuthenticated === 'boolean' &&
        typeof context.adminAuthenticated === 'boolean' &&
        typeof context.openAuthModal === 'boolean'
      return <div data-testid="types">{areBooleans ? 'boolean' : 'not-boolean'}</div>
    }
    render(<MyContextProvider><TypeTest /></MyContextProvider>)
    expect(screen.getByTestId('types')).toHaveTextContent('boolean')
  })

  test('setter functions are callable', () => {
    const SetterTest = () => {
      const context = Context()
      try {
        context.setUserAuthenticated(true)
        context.setAdminAuthenticated(true)
        context.setOpenAuthModal(true)
        return <div data-testid="setters">success</div>
      } catch {
        return <div data-testid="setters">error</div>
      }
    }
    render(<MyContextProvider><SetterTest /></MyContextProvider>)
    expect(screen.getByTestId('setters')).toHaveTextContent('success')
  })
})
