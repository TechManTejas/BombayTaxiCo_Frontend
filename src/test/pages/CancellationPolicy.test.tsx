import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import CancellationPolicy from '../../pages/CancellationPolicy'

describe('CancellationPolicy Page', () => {
  test('renders CancellationPolicy page', () => {
    render(
      <BrowserRouter>
        <CancellationPolicy />
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

