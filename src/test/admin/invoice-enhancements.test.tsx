import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import InvoiceDetails from '../../admin/pages/InvoiceDetails'

// Mock the invoice data
const mockInvoice = {
  id: 1,
  booking: {
    user_id: {
      email_id: 'test@example.com'
    }
  }
}

// Mock axios
vi.mock('../../api/axios', () => ({
  default: {
    post: vi.fn()
  }
}))

// Mock dom-to-image and jsPDF
vi.mock('dom-to-image', () => ({
  toPng: vi.fn().mockResolvedValue('data:image/png;base64,mock')
}))

vi.mock('jspdf', () => ({
  default: vi.fn().mockImplementation(() => ({
    getImageProperties: vi.fn().mockReturnValue({ height: 100, width: 100 }),
    internal: {
      getPageSize: vi.fn().mockReturnValue({ getWidth: () => 210 })
    },
    addImage: vi.fn(),
    output: vi.fn().mockReturnValue(new Blob())
  }))
}))

describe('Invoice Details Enhancements', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    )
  }

  test('renders invoice details component', () => {
    // Mock the location state
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom')
      return {
        ...actual,
        useLocation: () => ({
          state: { invoice: mockInvoice }
        })
      }
    })

    renderWithRouter(<InvoiceDetails />)
    expect(screen.getByText('INVOICE')).toBeInTheDocument()
    expect(screen.getByText('Print Invoice')).toBeInTheDocument()
    expect(screen.getByText('Send Invoice')).toBeInTheDocument()
  })

  test('shows loading state when sending invoice', async () => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom')
      return {
        ...actual,
        useLocation: () => ({
          state: { invoice: mockInvoice }
        })
      }
    })

    renderWithRouter(<InvoiceDetails />)
    
    const sendButton = screen.getByText('Send Invoice')
    fireEvent.click(sendButton)
    
    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument()
    })
  })

  test('shows error when email is not available', async () => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom')
      return {
        ...actual,
        useLocation: () => ({
          state: { invoice: { booking: { user_id: {} } } }
        })
      }
    })

    renderWithRouter(<InvoiceDetails />)
    
    const sendButton = screen.getByText('Send Invoice')
    fireEvent.click(sendButton)
    
    await waitFor(() => {
      expect(screen.getByText('Customer email not available')).toBeInTheDocument()
    })
  })
})
