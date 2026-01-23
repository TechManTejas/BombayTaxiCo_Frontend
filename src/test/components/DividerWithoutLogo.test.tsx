import { render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { DividerWithoutLogo } from '../../components/DividerWithoutLogo'

describe('DividerWithoutLogo Component', () => {
  test('renders DividerWithoutLogo component', () => {
    const { container } = render(<DividerWithoutLogo />)

    const divider = container.firstChild as HTMLElement
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveStyle({
      width: '100%',
      borderBottom: '1px solid #e9e9e9',
      marginTop: '10px',
      marginBottom: '10px'
    })
  })
})

