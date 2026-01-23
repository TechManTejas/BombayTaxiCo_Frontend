import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MyContextProvider } from '../../context/context.provider'
import { describe, test, expect } from 'vitest'
import Profile from '../../pages/Profile'

describe('Profile Page', () => {
  test('renders Profile page', () => {
    render(
      <BrowserRouter>
        <MyContextProvider>
          <Profile />
        </MyContextProvider>
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

