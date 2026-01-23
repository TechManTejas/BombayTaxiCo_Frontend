import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import Contact from '../../pages/Contact'

describe('Contact Page', () => {
  test('renders Contact page', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

