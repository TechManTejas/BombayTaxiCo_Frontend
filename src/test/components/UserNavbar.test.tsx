import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MyContextProvider } from '../../context/context.provider'
import { describe, test, expect } from 'vitest'
import { UserNavbar } from '../../components/UserNavbar'

describe('UserNavbar Component', () => {
  test('renders UserNavbar component', () => {
    render(
      <BrowserRouter>
        <MyContextProvider>
          <UserNavbar />
        </MyContextProvider>
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

