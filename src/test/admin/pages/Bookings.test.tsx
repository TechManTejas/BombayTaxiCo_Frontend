import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import Bookings from '../../../admin/pages/Bookings'

describe('Admin Bookings Page', () => {
  test('renders Bookings page', () => {
    render(
      <BrowserRouter>
        <Bookings />
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

