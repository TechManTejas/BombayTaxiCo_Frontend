import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import Authentication from '../../pages/Authentication'

describe('Authentication Page', () => {
  test('renders Authentication page', () => {
    render(
      <BrowserRouter>
        <Authentication />
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

