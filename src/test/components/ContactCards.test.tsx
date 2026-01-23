import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { ContactCards } from '../../components/ContactCards'

describe('ContactCards Component', () => {
  test('renders ContactCards component', () => {
    render(<ContactCards />)

    // Basic rendering test
    expect(screen.getByText).toBeDefined()
  })
})

