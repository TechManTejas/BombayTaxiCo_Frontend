import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import Taxis from '../../../admin/pages/Taxis'

describe('Admin Taxis Page', () => {
  test('renders Taxis page', () => {
    render(
      <BrowserRouter>
        <Taxis />
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

