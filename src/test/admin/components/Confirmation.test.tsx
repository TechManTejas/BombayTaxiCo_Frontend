import { render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { Confirmation } from '../../../admin/components/Confirmation'

describe('Admin Confirmation Component', () => {
  test('renders Confirmation component', () => {
    render(<Confirmation />)

    expect(document.body).toBeInTheDocument()
  })
})

