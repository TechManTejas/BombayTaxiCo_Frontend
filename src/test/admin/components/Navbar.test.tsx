import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import { Navbar } from '../../../admin/components/Navbar'

describe('Admin Navbar Component', () => {
  test('renders Navbar component', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

