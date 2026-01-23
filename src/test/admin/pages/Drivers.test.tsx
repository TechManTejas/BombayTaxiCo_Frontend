import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import Drivers from '../../../admin/pages/Drivers'

describe('Admin Drivers Page', () => {
  test('renders Drivers page', () => {
    render(
      <BrowserRouter>
        <Drivers />
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

