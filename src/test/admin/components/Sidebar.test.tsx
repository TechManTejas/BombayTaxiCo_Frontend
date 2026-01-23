import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import { Sidebar } from '../../../admin/components/Sidebar'

describe('Admin Sidebar Component', () => {
  test('renders Sidebar component', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

