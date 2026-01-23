import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import About from '../../pages/About'

describe('About Page', () => {
  test('renders About page without crashing', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

