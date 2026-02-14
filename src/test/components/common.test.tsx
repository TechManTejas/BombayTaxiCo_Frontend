import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Import components to test together
import CallUsNow from '../../components/CallUsNow'
import CallUsSticky from '../../components/CallUsSticky'
import Counter from '../../components/Counter'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'

describe('Common Components', () => {
  describe('CallUsNow', () => {
    it('renders call us now component', () => {
      render(<CallUsNow />)
      expect(screen.getByText(/call us/i)).toBeInTheDocument()
    })
  })

  describe('CallUsSticky', () => {
    it('renders sticky call component', () => {
      render(<CallUsSticky />)
      expect(screen.getByText(/call/i)).toBeInTheDocument()
    })
  })

  describe('Counter', () => {
    it('renders counter component', () => {
      render(<Counter />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Footer', () => {
    it('renders footer component', () => {
      render(<Footer />)
      expect(screen.getByText(/copyright/i)).toBeInTheDocument()
    })
  })

  describe('Sidebar', () => {
    it('renders sidebar component', () => {
      render(<Sidebar />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })
})
