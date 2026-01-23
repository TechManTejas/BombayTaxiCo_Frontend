import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import FAQs from '../../pages/FAQs'

describe('FAQs Page', () => {
  test('renders FAQs page', () => {
    render(
      <BrowserRouter>
        <FAQs />
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

