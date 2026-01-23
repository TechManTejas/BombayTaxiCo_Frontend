import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MyContextProvider } from '../../context/context.provider'
import { describe, test, expect } from 'vitest'
import HourlyRental from '../../pages/HourlyRental'

describe('HourlyRental Page', () => {
  test('renders HourlyRental page', () => {
    render(
      <BrowserRouter>
        <MyContextProvider>
          <HourlyRental />
        </MyContextProvider>
      </BrowserRouter>
    )

    expect(document.body).toBeInTheDocument()
  })
})

