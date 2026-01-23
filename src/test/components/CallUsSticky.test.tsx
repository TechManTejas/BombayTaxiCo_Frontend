import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import StickyCallUs from '../../components/CallUsSticky'

describe('CallUsSticky Component', () => {
  test('renders CallUsSticky component', () => {
    render(<StickyCallUs />)

    expect(screen.getByText('+91-6262-744-744')).toBeInTheDocument()
  })
})

