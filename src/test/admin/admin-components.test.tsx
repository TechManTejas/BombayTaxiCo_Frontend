import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

// Import admin components
import { Navbar } from '../../admin/components/Navbar'
import { Sidebar } from '../../admin/components/Sidebar'
import { Confirmation } from '../../admin/components/Confirmation'

describe('Admin Components', () => {
  describe('Navbar', () => {
    test('renders admin navbar', () => {
      render(<Navbar />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })

  describe('Sidebar', () => {
    test('renders admin sidebar', () => {
      render(<Sidebar />)
      expect(screen.getByRole('complementary')).toBeInTheDocument()
    })
  })

  describe('Confirmation', () => {
    test('renders confirmation dialog', () => {
      render(<Confirmation />)
      expect(screen.getByText(/confirm/i)).toBeInTheDocument()
    })
  })
})
