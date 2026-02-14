import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { CallUsNow } from '../../components/CallUsNow'

describe('CallUsNow Hover Effect', () => {
  test('has hover classes on phone link', () => {
    render(<CallUsNow />)
    
    const phoneLink = screen.getByRole('link', { name: /\+91-6262-744-744/i })
    expect(phoneLink).toHaveClass('hover:underline', 'hover:text-yellow-200', 'transition-colors')
  })

  test('phone link has correct href', () => {
    render(<CallUsNow />)
    
    const phoneLink = screen.getByRole('link', { name: /\+91-6262-744-744/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:+916262744744')
  })
})
