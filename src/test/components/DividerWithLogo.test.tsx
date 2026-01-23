import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { DividerWithLogo } from '../../components/DividerWithLogo'

describe('DividerWithLogo Component', () => {
  test('renders DividerWithLogo component', () => {
    render(<DividerWithLogo />)

    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', 'logo.png')
    expect(logo).toHaveAttribute('alt', '')
  })

  test('has correct styling structure', () => {
    const { container } = render(<DividerWithLogo />)

    // Check for the divider line
    const divider = container.querySelector('div')
    expect(divider).toHaveStyle({
      borderBottom: '1px solid #e9e9e9'
    })

    // Check for logo container
    const logoContainer = container.querySelectorAll('div')[1]
    expect(logoContainer).toBeInTheDocument()
  })
})

